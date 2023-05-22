import { PUZZLEHELPER } from "@/plugins/sudoku";

function countDigits(cells) {
    return cells.reduce((digitCount, { guess }) => {
        if (guess > 0) {
            digitCount[guess - 1]++;
        }
        return digitCount;
    }, Array(9).fill(0));
}

function puzzleChanged({ state, commit }) {
  const { cells } = state;
  commit('solved', PUZZLEHELPER.solved(cells));
  commit('digitCounts', countDigits(cells));
}

export {
    countDigits,
    puzzleChanged
}