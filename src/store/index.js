import Vue from 'vue'
import Vuex from 'vuex'
// using this engine
Vue.use(Vuex)
import {SudokuLevels, SudokuGrid, SudokuCell, SudokuDigits} from "@/plugins/sudoku";

const MAX_HISTORY = 20;

const PUZZLEHELPER = new SudokuGrid(SudokuLevels.EMPTY);

const LS_SUDOKU_SECONDS_TAKEN = 'SudokuSecondsTaken';
const LS_SUDOKU_STATE = 'SudokuState';
const LS_SUDOKU_HISTORY = 'SudokuHistory';

function _getSecondsTakenFromLS() {
    return parseInt(localStorage.getItem(LS_SUDOKU_SECONDS_TAKEN)) || 0;
}

function _setSecondsTakenToLS(seconds) {
    localStorage.setItem(LS_SUDOKU_SECONDS_TAKEN, seconds);
}

function puzzleChanged({state, commit}) {
    commit('solved', PUZZLEHELPER.solved(state.cells));
    commit('digitCounts', countDigits(state.cells));
}

function countDigits(cells) {
    let digitCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let cell of cells) {
        if (cell.guess > 0) {
            digitCount[cell.guess - 1]++;
        }
    }
    return digitCount;
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        cells: Array.apply(null, Array(81)).map(function () { return new SudokuCell('', false) }),
        level: SudokuLevels.EASY,
        secondsTaken: _getSecondsTakenFromLS(),
        validation: false,
        history: [],
        ready: false,
        selectedDigit: SudokuDigits.EMPTY,
        selectedCell: SudokuDigits.EMPTY,
        isNotesMode: false,
        digitCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        solved: false
    },
    mutations: {
        cells(state, payload) {
            state.cells = payload
        },
        solved(state, payload) {
            state.solved = payload
        },
        digitCounts(state, payload) {
            state.digitCounts = payload
        },
        level(state, payload) {
            state.level = payload
        },
        secondsTaken(state, payload) {
            state.secondsTaken = payload
            _setSecondsTakenToLS(state.secondsTaken)
        },
        secondsTakenInc(state) {
            state.secondsTaken++
            _setSecondsTakenToLS(state.secondsTaken)
        },
        toggleValidation(state) {
            state.validation = !state.validation
        },
        ready(state, payload) {
            state.ready = payload
        },
        selectedDigit(state, payload) {
            state.selectedDigit = payload
            state.selectedCell = -1
        },
        selectedCell(state, payload) {
            state.selectedCell = payload
            state.selectedDigit = SudokuDigits.EMPTY
        },
        notesMode(state, payload) {
            state.isNotesMode = payload
        },
        pushGameHistory(state) {
            state.history.push(JSON.stringify(state.cells));
            if (state.history.length > MAX_HISTORY) {
                state.history.shift();
            }
            localStorage.setItem(LS_SUDOKU_HISTORY, JSON.stringify(state.history));
        },
        history(state, payload) {
            state.history = payload
        },
        setCellGuess(state, {cellIndex, guess}) {
            state.cells[cellIndex].guess = guess === 0 ? '' : guess;
            puzzleChanged(this);
        },
        clearCellGuess(state, {cellIndex}) {
            state.cells[cellIndex].guess = '';
            puzzleChanged(this);
        },
        setCellNotes(state, {cellIndex, notes}) {
            state.cells[cellIndex].notes = notes;
        },
        clearCellNotes(state, {cellIndex}) {
            state.cells[cellIndex].notes = [false, false, false, false, false, false, false, false, false];
        },
        toggleCellGuess(state, {cellIndex, guess}) {
            if (parseInt(state.cells[cellIndex].guess) === parseInt(guess) || guess <= 0) {
                this.commit('clearCellGuess', {cellIndex});
            } else {
                this.commit('setCellGuess', {cellIndex, guess});
            }
        },
        toggleNotesGuess(state, {cellIndex, guess}) {
            let notes = [...state.cells[cellIndex].notes];
            if (guess <= 0) {
                notes = [false, false, false, false, false, false, false, false, false];
            } else {
                notes[parseInt(guess) - 1] = !notes[parseInt(guess) - 1]
            }
            this.commit('setCellNotes', {cellIndex, notes});
        }
    },
    actions: {
        saveGame({state}) {
            localStorage.setItem(LS_SUDOKU_STATE, JSON.stringify(state));
        },
        undo({state, commit, dispatch}) {
            const history = [...state.history];
            if (history.length > 0) {
                const previous = JSON.parse(history.pop());
                commit('cells', previous);
                puzzleChanged(this)
                commit('history', history);
                dispatch('saveGame');
            }
        },

        autoNotes({state, commit }) {
            for (let cellIdx in state.cells) {
                const notes = PUZZLEHELPER.getAutoNotes(state.cells, cellIdx)
                commit('setCellNotes', {cellIndex: cellIdx, notes: notes})
            }
        },
        autoTrimNotes({state, commit}, {cellIndex, guess}) {
            for (let checkIdx of PUZZLEHELPER.getRelatedCells(cellIndex)) {
                if (checkIdx === cellIndex) continue;
                const notes = [...state.cells[checkIdx].notes];
                notes[parseInt(guess) - 1] = false;
                commit('setCellNotes', {cellIndex: checkIdx, notes: notes})
            }
        },

        newPuzzle({commit, dispatch}, level) {
            commit('cells', PUZZLEHELPER.generatePuzzleForLevel(level));
            commit('ready', false);
            commit('level', level);
            commit('history', []);
            commit('selectedDigit', SudokuDigits.EMPTY);
            commit('selectedCell', SudokuDigits.EMPTY);
            commit('secondsTaken', 0);
            puzzleChanged(this)
            commit('ready', true);
            dispatch('saveGame');
        },
        loadPuzzle({commit}, puzzleState) {
            commit('ready', false);
            commit('cells', puzzleState.cells);
            commit('history', puzzleState.history);
            commit('level', puzzleState.level);
            commit('selectedDigit', puzzleState.selectedDigit);
            commit('selectedCell', puzzleState.selectedCell);
            puzzleChanged(this)
            commit('ready', true);
        },
        loadGame({commit, dispatch}) {
            const puzzleJson = localStorage.getItem(LS_SUDOKU_STATE)
            if (puzzleJson) {
                dispatch('loadPuzzle', JSON.parse(puzzleJson));
                commit('secondsTaken', _getSecondsTakenFromLS());
            } else {
                dispatch('newPuzzle', SudokuLevels.EASY);
                dispatch('saveGame');
            }
        }

    },
    modules: {}
})
