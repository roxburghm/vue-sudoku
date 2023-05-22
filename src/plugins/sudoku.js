import SudokuEngine from 'sudoku.js/sudoku.js'

export class SudokuCell {

    cells = '';
    guess  = '';
    notes = [false, false, false, false, false, false, false, false, false];
    locked = false;
    constructor(actual, locked) {
        this.actual = actual;
        this.locked = locked;
    }

    setLocked(value) {
        this.guess = value;
        this.locked = true;
    }

    setActual(value) {
        this.actual = value;
    }

    setGuess(value) {
        this.guess = value;
    }

    setNotes(value) {
        this.notes = value;
    }

    toggleNote(guess) {
        this.notes[guess] = !this.notes[guess];
    }

}

function puzzleCoordinatesToIndex(coordinate) {
    let x = coordinate.charCodeAt(0) - 65;
    let y = parseInt(coordinate.charAt(1)) - 1;
    return x + (y * 9);
}

export class SudokuGrid {

    generatePuzzleForLevel(level) {

        const cells = this.generateBlankGrid();

        var puzzle = SudokuEngine.generate(level);
        var solvedPuzzle = SudokuEngine.solve(puzzle);
        for (let coordinate in puzzle) {
            cells[puzzleCoordinatesToIndex(coordinate)].setLocked(puzzle[coordinate]);
        }
        for (let coordinate in solvedPuzzle) {
            cells[puzzleCoordinatesToIndex(coordinate)].setActual(solvedPuzzle[coordinate]);
        }
        return cells;
    }

    generateBlankGrid() {
        const cells = [];
        for (let y = 0; y < 81; y++) {
            cells.push(new SudokuCell('', false));
        }
        return cells;
    }

    solved(cells) {
        for (let cell of cells) {
            if (parseInt(cell.actual) !== parseInt(cell.guess)) {
                return false;
            }
        }
        return true;
    }

    getRelatedCells(cellIndex) {
        const relatedCells = [];
        const x = cellIndex % 9;
        const y = Math.floor(cellIndex / 9);
        const blockX = Math.floor(x / 3);
        const blockY = Math.floor(y / 3);
        for (let i = 0; i < 9; i++) {
            relatedCells.push(x + (i * 9));
            relatedCells.push(i + (y * 9));
            relatedCells.push((blockX * 3) + ((blockY * 3) * 9) + (i % 3) + (Math.floor(i / 3) * 9));
        }
        return relatedCells;
    }

    areReferencedCellsComplete(cells, cellList) {
        for (let cell of cellList) {
            if (cells[cell].guess === '') return false;
        }
        return true;
    }

    isCompleteRow(cells, cellIndex) {
        let related = this.getRelatedCellsInRow(cellIndex)
        return this.areReferencedCellsComplete(cells, related)
    }
    isCompleteColumn(cells, cellIndex) {
        let related = this.getRelatedCellsInColumn(cellIndex)
        return this.areReferencedCellsComplete(cells, related)
    }

    isCompleteBlock(cells, cellIndex) {
        let related = this.getRelatedCellsInBlock(cellIndex)
        return this.areReferencedCellsComplete(cells, related)
    }

    getRelatedCellsInBlock(cellIndex) {
        const relatedCells = [];
        const x = cellIndex % 9;
        const y = Math.floor(cellIndex / 9);
        const blockX = Math.floor(x / 3);
        const blockY = Math.floor(y / 3);
        for (let i = 0; i < 9; i++) {
            relatedCells.push((blockX * 3) + ((blockY * 3) * 9) + (i % 3) + (Math.floor(i / 3) * 9));
        }
        return relatedCells;
    }

    getRelatedCellsInColumn(cellIndex) {
        const relatedCells = [];
        const y = Math.floor(cellIndex / 9);
        for (let i = 0; i < 9; i++) {
            relatedCells.push(i + (y * 9));
        }
        return relatedCells;
    }

    getRelatedCellsInRow(cellIndex) {
        const relatedCells = [];
        const x = cellIndex % 9;
        for (let i = 0; i < 9; i++) {
            relatedCells.push(x + (i * 9));
        }
        return relatedCells;
    }

    getAutoNotes(cells, cellIndex) {
        if (cells[cellIndex].locked) return [false, false, false, false, false, false, false, false, false];

        const notes = [true, true, true, true, true, true, true, true, true];
        for (let checkIdx of this.getRelatedCells(cellIndex)) {
            if (cells[checkIdx].guess !== '') {
                notes[cells[checkIdx].guess - 1] = false;
            }
        }
        return notes;
    }

    countDigits(cells, digit) {
        let count = 0;
        for (let cell of cells) {
            if (parseInt(cell.actual) === parseInt(digit)) {
                count++;
            }
        }
        return count;
    }
}

export const SudokuLevels = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    EMPTY: 'empty'
}

export const SudokuDigits = {
    ERASER: 0,
    EMPTY: -1
}

export const PUZZLEHELPER = new SudokuGrid(SudokuLevels.EMPTY);

