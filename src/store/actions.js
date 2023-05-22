import LS from "@/lib/localStorage";
import {PUZZLEHELPER, SudokuLevels, SudokuDigits} from "@/plugins/sudoku";
import {puzzleChanged} from "@/store/common";
import {v4 as uuidv4} from 'uuid';

export default {
    saveGame({state}) {
        localStorage.setItem(LS.KEY.SUDOKU_STATE, JSON.stringify(state));
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

    clearNotes({state, commit}) {
        for (let cellIdx in state.cells) {
            const notes = [false,false, false,false,false, false,false,false, false];
            commit('setCellNotes', {cellIndex: cellIdx, notes: notes})
        }
    },

    autoPass({state, commit}) {
        for (let cellIdx in state.cells) {
            commit('setCellGuess', {cellIndex: cellIdx, guess: state.cells[cellIdx].actual})
        }
        for (let cellIdx of [80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65]) {
            if (!state.cells[cellIdx].locked) {
                commit('setCellGuess', {cellIndex: cellIdx, guess: ''})
                commit('selectedDigit', state.cells[cellIdx].actual)
                break;
            }
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
        dispatch('saveGame');
        commit('secondsTaken', 0);
    },
    loadGame({commit, dispatch}) {
        const puzzleJson = localStorage.getItem(LS.KEY.SUDOKU_STATE)
        if (puzzleJson) {
            const puzzleState = JSON.parse(puzzleJson);
            commit('ready', false);
            commit('cells', puzzleState.cells);
            commit('history', puzzleState.history);
            commit('level', puzzleState.level);
            commit('selectedDigit', puzzleState.selectedDigit);
            commit('selectedCell', puzzleState.selectedCell);
            puzzleChanged(this)

            commit('ready', true);
            commit('secondsTaken', parseInt(LS.getString(LS.KEY.SUDOKU_SECONDS_TAKEN, 0)));
        } else {
            dispatch('newPuzzle', SudokuLevels.EASY);
            dispatch('saveGame');
        }
    }
}