import LS from '@/lib/localStorage.js'

const EMPTY_HIGHSCORE_TABLE = { easy: [], medium: [], hard: [] };

function getHighScoresFromLS(localStorageKey) {
    const highScores = LS.getObject(localStorageKey, null);

    if (highScores === null) {
        return EMPTY_HIGHSCORE_TABLE;
    }
    return highScores;
}

function saveHighScoresToLS(localStorageKey, highScores) {
    LS.setObject(localStorageKey, highScores);
}

export default {
    getHighScoresFromLS,
    saveHighScoresToLS
}