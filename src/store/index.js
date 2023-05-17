import {v4 as uuidv4} from 'uuid';
import Vue from 'vue'
import Vuex from 'vuex'

// using this engine
Vue.use(Vuex)
import {SudokuLevels, SudokuGrid, SudokuCell, SudokuDigits} from "@/plugins/sudoku";

const MAX_HISTORY = 20;

const PUZZLEHELPER = new SudokuGrid(SudokuLevels.EMPTY);

const LS_SUDOKU_SHOW_COUNTDOWN = 'SudokuShowCountdown';
const LS_SUDOKU_SECONDS_TAKEN = 'SudokuSecondsTaken';
const LS_SUDOKU_STATE = 'SudokuState';
const LS_SUDOKU_HISTORY = 'SudokuHistory';
const LS_SUDOKU_LEVEL = 'SudokuLevel';
const LS_SUDOKU_GAME_ID = 'SudokuGameId';
const LS_SUDOKU_THEME_DARK = 'SudokuThemeDark';
const LS_SUDOKU_THEME_COLOR = 'SudokuThemeColor';
const LS_SUDOKU_ALLOW_VALIDATION = 'SudokuAllowValidation';
const LS_SUDOKU_FINISHED = 'SudokuFinished';
const LS_SUDOKU_HIGH_SCORE = 'SudokuHighScore';
const LS_SUDOKU_ALLOW_AUTO_NOTES = 'SudokuAllowAutoNotes';
const LS_SUDOKU_VIBRATE_ON_DIGIT_COMPLETE = 'SudokuVibrateOnDigitComplete';
const LS_SUDOKU_HIGHLIGHT_ON_SINGLE_NOTE = 'SudokuHighlightSingleNote';
const LS_SUDOKU_DRAG_TO_SCRUB = 'SudokuDragToScrub';
const LS_SUDOKU_COMPLETE_SINGLE_NOTE = 'SudokuCompleteSingleNote';
const LS_SUDOKU_HIDE_COFFEE = 'SudokuHideCoffee';
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
function _alertError() {
    navigator.vibrate([50, 50, 80]);
}

function _saveHighScoresToLS(highScores) {
    localStorage.setItem(LS_SUDOKU_HIGH_SCORES, JSON.stringify(highScores));
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

function _getStringFromLS(key, defaultValue) {
    let val = localStorage.getItem(key);
    if (val === null) {
        return defaultValue;
    }
    return val;
}
function _setStringToLS(key, value) {
    localStorage.setItem(key, value);
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
        themeColor: _getStringFromLS(LS_SUDOKU_THEME_COLOR, 'blue'),
        level: _getStringFromLS(LS_SUDOKU_LEVEL, SudokuLevels.EASY),
        secondsTaken: parseInt(_getStringFromLS(LS_SUDOKU_SECONDS_TAKEN, 0)),
        validation: false,
        history: [],
        ready: false,
        selectedDigit: SudokuDigits.EMPTY,
        selectedCell: SudokuDigits.EMPTY,
        isNotesMode: false,
        digitCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        solved: false,
        highScores: _getHighScoresFromLS(),
        gameId: _getStringFromLS(LS_SUDOKU_GAME_ID, uuidv4()),
        paused: false,
        finished: _getBooleanFromLS(LS_SUDOKU_FINISHED, false),
        highScore: _getBooleanFromLS(LS_SUDOKU_HIGH_SCORE, false),
        allowAutoNotes: _getBooleanFromLS(LS_SUDOKU_ALLOW_AUTO_NOTES, true),
        allowValidation: _getBooleanFromLS(LS_SUDOKU_ALLOW_VALIDATION, true),
        vibrateOnDigitComplete: _getBooleanFromLS(LS_SUDOKU_VIBRATE_ON_DIGIT_COMPLETE, true),
        highlightSingleNote: _getBooleanFromLS(LS_SUDOKU_HIGHLIGHT_ON_SINGLE_NOTE, true),
        showCountdown: _getBooleanFromLS(LS_SUDOKU_SHOW_COUNTDOWN, true),
        dragToScrub: _getBooleanFromLS(LS_SUDOKU_DRAG_TO_SCRUB, true),
        hideCoffee: _getBooleanFromLS(LS_SUDOKU_HIDE_COFFEE, false),
        completeSingleNote: _getBooleanFromLS(LS_SUDOKU_COMPLETE_SINGLE_NOTE, false),
    },
    mutations: {
        hideCoffee(state, payload) {
            state.hideCoffee = payload;
            _setBooleanToLS(LS_SUDOKU_HIDE_COFFEE, state.hideCoffee)
        },
        completeSingleNote(state, payload) {
            state.completeSingleNote = payload;
            _setBooleanToLS(LS_SUDOKU_COMPLETE_SINGLE_NOTE, state.completeSingleNote)
        },
        togglePaused(state) {
            state.paused = !state.paused;
        },
        dragToScrub(state, payload) {
            state.dragToScrub = payload;
            _setBooleanToLS(LS_SUDOKU_DRAG_TO_SCRUB, state.dragToScrub)
        },
        showCountdown(state, payload) {
            state.showCountdown = payload;
            _setBooleanToLS(LS_SUDOKU_SHOW_COUNTDOWN, state.showCountdown)
        },
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
            _setStringToLS(LS_SUDOKU_GAME_ID, state.gameId)
        },
        themeDark(state, payload) {
            state.themeDark = payload;
            _setBooleanToLS(LS_SUDOKU_THEME_DARK, state.themeDark)
        },
        themeColor(state, payload) {
            state.themeColor = payload;
            _setStringToLS(LS_SUDOKU_THEME_COLOR, state.themeColor)
        },
        finished(state, payload) {
            state.finished = payload;
            _setBooleanToLS(LS_SUDOKU_FINISHED, state.finished)
        },
        highScore(state, payload) {
            state.highScore = payload;
            _setBooleanToLS(LS_SUDOKU_HIGH_SCORE, state.highScore)
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
            _setStringToLS(LS_SUDOKU_LEVEL, state.level)
        },
        secondsTaken(state, payload) {
            state.secondsTaken = payload
            _setStringToLS(LS_SUDOKU_SECONDS_TAKEN, state.secondsTaken);
        },
        secondsTakenInc(state) {
            if (!state.paused) {
                state.secondsTaken++
                _setStringToLS(LS_SUDOKU_SECONDS_TAKEN, state.secondsTaken);
            }
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
            if (state.validation && parseInt(state.cells[cellIndex].guess) !== parseInt(state.cells[cellIndex].actual)) {
                _alertError();
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
        },
        setCellNote(state, {cellIndex, digit, value}) {
            let notes = [...state.cells[cellIndex].notes];
            if (digit <= 0) {
                notes = [false, false, false, false, false, false, false, false, false];
            } else {
                notes[parseInt(digit) - 1] = value;
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
        clearNotes({state, commit}) {
            for (let cellIdx in state.cells) {
                const notes = [false,false, false,false,false, false,false,false, false];
                commit('setCellNotes', {cellIndex: cellIdx, notes: notes})
            }
        },
        autoPass({state, commit}) {
            console.log('auto pass');
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
                commit('secondsTaken', parseInt(_getStringFromLS(LS_SUDOKU_SECONDS_TAKEN, 0)));
            } else {
                dispatch('newPuzzle', SudokuLevels.EASY);
                dispatch('saveGame');
            }
        }

    },
    modules: {}
})
