import {v4 as uuidv4} from 'uuid';
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
const LS_SUDOKU_LEVEL = 'SudokuLevel';
const LS_SUDOKU_GAME_ID = 'SudokuGameId';
const LS_SUDOKU_THEME_DARK = 'SudokuThemeDark';
const LS_SUDOKU_ALLOW_VALIDATION = 'SudokuAllowValidation';
const LS_SUDOKU_ALLOW_AUTO_NOTES = 'SudokuAllowAutoNotes';
const LS_SUDOKU_VIBRATE_ON_DIGIT_COMPLETE = 'SudokuVibrateOnDigitComplete';
const LS_SUDOKU_HIGHLIGHT_ON_SINGLE_NOTE = 'SudokuHighlightSingleNote';
const NO_OF_HIGH_SCORES = 10;
const LS_SUDOKU_HIGH_SCORES = 'SudokuHighScores';

function _getHighScoresFromLS() {
    const highScoreString = localStorage.getItem(LS_SUDOKU_HIGH_SCORES);
    const highScores = JSON.parse(highScoreString)

    if (highScores === null) {
        return {easy: [], medium: [], hard: []};

    }
    return highScores;
}

function _alertCompleted() {
    navigator.vibrate(100);
}

function _saveHighScoresToLS(highScores) {
    localStorage.setItem(LS_SUDOKU_HIGH_SCORES, JSON.stringify(highScores));
}

function _getSecondsTakenFromLS() {
    return parseInt(localStorage.getItem(LS_SUDOKU_SECONDS_TAKEN)) || 0;
}

function _setSecondsTakenToLS(seconds) {
    localStorage.setItem(LS_SUDOKU_SECONDS_TAKEN, seconds);
}

function _getBooleanFromLS(key, defaultValue) {
    let val = localStorage.getItem(key);
    if (val === null) {
        return defaultValue;
    }
    return val !=='0';
}

function _setBooleanToLS(key, value) {
    localStorage.setItem(key, value ? '1' : '0');
}

function _getLevelFromLS() {
    return localStorage.getItem(LS_SUDOKU_LEVEL) || SudokuLevels.EASY;
}

function _setLevelToLS(level) {
    localStorage.setItem(LS_SUDOKU_LEVEL, level);
}

function _getGameIdFromLS() {
    return localStorage.getItem(LS_SUDOKU_GAME_ID) || uuidv4();
}

function _setGameIdToLS(gameId) {
    localStorage.setItem(LS_SUDOKU_GAME_ID, gameId);
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
        cells: Array.apply(null, Array(81)).map(function () {
            return new SudokuCell('', false)
        }),
        themeDark: _getBooleanFromLS(LS_SUDOKU_THEME_DARK, false),
        level: _getLevelFromLS(),
        secondsTaken: _getSecondsTakenFromLS(),
        validation: false,
        history: [],
        ready: false,
        selectedDigit: SudokuDigits.EMPTY,
        selectedCell: SudokuDigits.EMPTY,
        isNotesMode: false,
        digitCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        solved: false,
        finished: false,
        highScore: false,
        highScores: _getHighScoresFromLS(),
        gameId: _getGameIdFromLS(),
        allowAutoNotes: _getBooleanFromLS(LS_SUDOKU_ALLOW_AUTO_NOTES, true),
        allowValidation: _getBooleanFromLS(LS_SUDOKU_ALLOW_VALIDATION, true),
        vibrateOnDigitComplete: _getBooleanFromLS(LS_SUDOKU_VIBRATE_ON_DIGIT_COMPLETE, true),
        highlightSingleNote: _getBooleanFromLS(LS_SUDOKU_HIGHLIGHT_ON_SINGLE_NOTE, true),
    },
    mutations: {
        highlightSingleNote(state, payload) {
            state.highlightSingleNote = payload;
            _setBooleanToLS(LS_SUDOKU_HIGHLIGHT_ON_SINGLE_NOTE, state.highlightSingleNote)
        },
        vibrateOnDigitComplete(state, payload) {
            state.vibrateOnDigitComplete = payload;
            _setBooleanToLS(LS_SUDOKU_VIBRATE_ON_DIGIT_COMPLETE, state.vibrateOnDigitComplete)
        },
        allowAutoNotes(state, payload) {
            state.allowAutoNotes = payload;
            _setBooleanToLS(LS_SUDOKU_ALLOW_AUTO_NOTES, state.allowAutoNotes)
        },
        allowValidation(state, payload) {
            state.allowValidation = payload;
            _setBooleanToLS(LS_SUDOKU_ALLOW_VALIDATION, state.allowValidation)
        },
        gameId(state, payload) {
            state.gameId = payload;
            _setGameIdToLS(state.gameId)
        },
        themeDark(state, payload) {
            console.log('themeDark', payload)
            state.themeDark = payload;
            _setBooleanToLS(LS_SUDOKU_THEME_DARK, state.themeDark)
        },
        finished(state, payload) {
            state.finished = payload;
        },
        highScore(state, payload) {
            state.highScore = payload;
        },
        addHighScore(state, payload) {

            const time = payload.time;
            const highScores = state.highScores[payload.level];
            const gameId = state.gameId;
            const slowestTime =
                highScores.length === 0 ? 99999 :
                    highScores[highScores.length - 1].time;

            if (time < slowestTime || highScores.length < NO_OF_HIGH_SCORES) {
                const newScore = { time: time, when: new Date().getTime(), gameId: gameId }
                state.highScores[payload.level].push(newScore);
                state.highScores[payload.level].sort((a, b) => a.time - b.time);
                state.highScores[payload.level].splice(NO_OF_HIGH_SCORES);
                _saveHighScoresToLS(state.highScores);
                state.highScore = true;
            } else {
                state.highScore = false;
            }
        },
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
            _setLevelToLS(state.level)
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
            if (state.vibrateOnDigitComplete && state.digitCounts[guess - 1] === 9) {
                _alertCompleted()
            }
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

        autoNotes({state, commit}) {
            for (let cellIdx in state.cells) {
                const notes = PUZZLEHELPER.getAutoNotes(state.cells, cellIdx)
                commit('setCellNotes', {cellIndex: cellIdx, notes: notes})
            }
        },
        autoPass({state, commit}) {
            console.log('auto pass');
            for (let cellIdx in state.cells) {
                commit('setCellGuess', {cellIndex: cellIdx, guess: state.cells[cellIdx].actual})
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
            commit('gameId', uuidv4())
            commit('cells', PUZZLEHELPER.generatePuzzleForLevel(level));
            commit('ready', false);
            commit('level', level);
            commit('history', []);
            commit('finished', false);
            commit('highScore', false);
            commit('selectedDigit', SudokuDigits.EMPTY);
            commit('selectedCell', SudokuDigits.EMPTY);
            puzzleChanged(this)
            commit('ready', true);
            commit('secondsTaken', 0);
            dispatch('saveGame');
            commit('secondsTaken', 0);
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
