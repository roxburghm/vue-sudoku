function getBoolean(key, defaultValue) {
    let val = localStorage.getItem(key);
    if (val === null) {
        return defaultValue;
    }
    return val !== '0';
}

function setBoolean(key, value) {
    localStorage.setItem(key, value ? '1' : '0');
}

function getString(key, defaultValue) {
    let val = localStorage.getItem(key);
    if (val === null) {
        return defaultValue;
    }
    return val;
}

function setString(key, value) {
    localStorage.setItem(key, value);
}

function getInt(key, defaultValue) {
    return parseInt(getString(key, defaultValue));
}

function setInt(key, value) {
    setString(key, value);
}

function getObject(key, defaultValue) {
    return JSON.parse(getString(key, defaultValue));
}

function setObject(key, value) {
    setString(key, JSON.stringify(value));
}

export default {
    getBoolean,
    setBoolean,
    getString,
    setString,
    getInt,
    setInt,
    getObject,
    setObject,
    KEY: {
        SUDOKU_LOCK_CORRECT_CELLS: 'SudokuLockCorrectCells',
        SUDOKU_SHOW_COUNTDOWN: 'SudokuShowCountdown',
        SUDOKU_SECONDS_TAKEN: 'SudokuSecondsTaken',
        SUDOKU_STATE: 'SudokuState',
        SUDOKU_HISTORY: 'SudokuHistory',
        SUDOKU_LEVEL: 'SudokuLevel',
        SUDOKU_GAME_ID: 'SudokuGameId',
        SUDOKU_THEME_DARK: 'SudokuThemeDark',
        SUDOKU_THEME_COLOR: 'SudokuThemeColor',
        SUDOKU_ALLOW_VALIDATION: 'SudokuAllowValidation',
        SUDOKU_FINISHED: 'SudokuFinished',
        SUDOKU_ALLOW_AUTO_NOTES: 'SudokuAllowAutoNotes',
        SUDOKU_VIBRATE_ON_DIGIT_COMPLETE: 'SudokuVibrateOnDigitComplete',
        SUDOKU_HIGHLIGHT_ON_SINGLE_NOTE: 'SudokuHighlightSingleNote',
        SUDOKU_DRAG_TO_SCRUB: 'SudokuDragToScrub',
        SUDOKU_COMPLETE_SINGLE_NOTE: 'SudokuCompleteSingleNote',
        SUDOKU_HIDE_COFFEE: 'SudokuHideCoffee',
        SUDOKU_HIGH_SCORES: 'SudokuHighScores',
    }
}