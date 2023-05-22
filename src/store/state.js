import LS from '@/lib/localStorage.js';
import {v4 as uuidv4} from 'uuid';
import HighscoreLib from "@/lib/highscore";
import {SudokuLevels, SudokuCell, SudokuDigits} from "@/plugins/sudoku";

function _blankCells() {
    return Array.apply(null, Array(81)).map(function () {
        return new SudokuCell('', false)
    })
}

export default {
        cells: _blankCells(),
        themeDark: LS.getBoolean(LS.KEY.SUDOKU_THEME_DARK, false),
        themeColor: LS.getString(LS.KEY.SUDOKU_THEME_COLOR, 'blue'),
        level: LS.getString(LS.KEY.SUDOKU_LEVEL, SudokuLevels.EASY),
        secondsTaken: LS.getInt(LS.KEY.SUDOKU_SECONDS_TAKEN, 0),
        validation: false,
        history: [],
        ready: false,
        selectedDigit: SudokuDigits.EMPTY,
        selectedCell: SudokuDigits.EMPTY,
        isNotesMode: false,
        digitCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        solved: false,
        highScores: HighscoreLib.getHighScoresFromLS(LS.KEY.SUDOKU_HIGH_SCORES),
        gameId: LS.getString(LS.KEY.SUDOKU_GAME_ID, uuidv4()),
        paused: false,
        finished: LS.getBoolean(LS.KEY.SUDOKU_FINISHED, false),
        allowAutoNotes: LS.getBoolean(LS.KEY.SUDOKU_ALLOW_AUTO_NOTES, true),
        allowValidation: LS.getBoolean(LS.KEY.SUDOKU_ALLOW_VALIDATION, true),
        vibrateOnDigitComplete: LS.getBoolean(LS.KEY.SUDOKU_VIBRATE_ON_DIGIT_COMPLETE, true),
        highlightSingleNote: LS.getBoolean(LS.KEY.SUDOKU_HIGHLIGHT_ON_SINGLE_NOTE, false),
        showCountdown: LS.getBoolean(LS.KEY.SUDOKU_SHOW_COUNTDOWN, true),
        dragToScrub: LS.getBoolean(LS.KEY.SUDOKU_DRAG_TO_SCRUB, true),
        hideCoffee: LS.getBoolean(LS.KEY.SUDOKU_HIDE_COFFEE, false),
        completeSingleNote: LS.getBoolean(LS.KEY.SUDOKU_COMPLETE_SINGLE_NOTE, false),
        lockCorrectCells: LS.getBoolean(LS.KEY.SUDOKU_LOCK_CORRECT_CELLS, false),
    }
