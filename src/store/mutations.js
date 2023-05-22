import Vibrate from "@/lib/vibrate";
import HighscoreLib from "@/lib/highscore";
import LS from "@/lib/localStorage";
import Persisted from "@/lib/persisted";
import {SudokuDigits} from "@/plugins/sudoku";
import {puzzleChanged} from "@/store/common";

const MAX_HISTORY = 20;
const NO_OF_HIGH_SCORES = 10;

export default {
    hideCoffee: Persisted.setBoolean('hideCoffee', LS.KEY.SUDOKU_HIDE_COFFEE),
    hideCoffeex: Persisted.setBoolean('hideCoffee', LS.KEY.SUDOKU_HIDE_COFFEE),
    lockCorrectCells: Persisted.setBoolean('lockCorrectCells', LS.KEY.SUDOKU_LOCK_CORRECT_CELLS),
    completeSingleNote: Persisted.setBoolean('completeSingleNote', LS.KEY.SUDOKU_COMPLETE_SINGLE_NOTE),
    dragToScrub: Persisted.setBoolean('dragToScrub', LS.KEY.SUDOKU_DRAG_TO_SCRUB),
    showCountdown: Persisted.setBoolean('showCountdown', LS.KEY.SUDOKU_SHOW_COUNTDOWN),
    highlightSingleNote: Persisted.setBoolean('highlightSingleNote', LS.KEY.SUDOKU_HIGHLIGHT_ON_SINGLE_NOTE),
    vibrateOnDigitComplete: Persisted.setBoolean('vibrateOnDigitComplete', LS.KEY.SUDOKU_VIBRATE_ON_DIGIT_COMPLETE),
    allowAutoNotes: Persisted.setBoolean('allowAutoNotes', LS.KEY.SUDOKU_ALLOW_AUTO_NOTES),
    allowValidation: Persisted.setBoolean('allowValidation', LS.KEY.SUDOKU_ALLOW_VALIDATION),
    gameId: Persisted.setString('gameId', LS.KEY.SUDOKU_GAME_ID),
    themeDark: Persisted.setBoolean('themeDark', LS.KEY.SUDOKU_THEME_DARK),
    themeColor: Persisted.setString('themeColor', LS.KEY.SUDOKU_THEME_COLOR),
    finished: Persisted.setBoolean('finished', LS.KEY.SUDOKU_FINISHED),
    togglePaused(state) {
        state.paused = !state.paused;
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
            HighscoreLib.saveHighScoresToLS(LS.KEY.SUDOKU_HIGH_SCORES, state.highScores);
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
    level: Persisted.setString('level', LS.KEY.SUDOKU_LEVEL),
    secondsTaken: Persisted.setInt('secondsTaken', LS.KEY.SUDOKU_SECONDS_TAKEN),
    secondsTakenInc(state) {
        if (!state.paused) {
            state.secondsTaken++
            LS.setInt(LS.KEY.SUDOKU_SECONDS_TAKEN, state.secondsTaken);
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
        localStorage.setItem(LS.KEY.SUDOKU_HISTORY, JSON.stringify(state.history));
    },
    history(state, payload) {
        state.history = payload
    },
    setCellGuess(state, {cellIndex, guess}) {
        if (state.lockCorrectCells && parseInt(state.cells[cellIndex].guess) === parseInt(state.cells[cellIndex].actual)) {
            return;
        }
        state.cells[cellIndex].guess = guess === 0 ? '' : guess;
        puzzleChanged(this);
        if (state.vibrateOnDigitComplete && state.digitCounts[guess - 1] === 9) {
            Vibrate.complete()
        }
        if (state.validation && parseInt(state.cells[cellIndex].guess) !== parseInt(state.cells[cellIndex].actual)) {
            Vibrate.error();
        }
    },
    clearCellGuess(state, {cellIndex}) {
        if (state.lockCorrectCells && parseInt(state.cells[cellIndex].guess) === parseInt(state.cells[cellIndex].actual)) {
            return;
        }
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
}