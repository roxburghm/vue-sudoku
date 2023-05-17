export default {
    methods: {
        toggleCellGuessOrNote(cellIndex, guess) {
            if (cellIndex < 0) return;

            if (this.cells[cellIndex].locked) return;
            if (guess < 0 || guess > 9) return;

            if (guess === 0) {
                this.$store.commit('clearCellNotes', {cellIndex});
                this.$store.commit('clearCellGuess', {cellIndex});
                this.$store.dispatch('saveGame');
                return;
            }

            if (this.isNotesMode) {
                this.$store.commit('clearCellGuess', {cellIndex});
                this.toggleCellNote(cellIndex, guess);
            } else {
                this.toggleCellGuess(cellIndex, guess);
            }
        },
        toggleCellNote(cellIndex, guess) {
            if (guess === 0 || this.cells[cellIndex].locked) return;
            this.$store.commit('toggleNotesGuess', {cellIndex: cellIndex, guess: guess});
            this.$store.dispatch('saveGame');
        },
        toggleCellGuess(cellIndex, guess) {
            if (this.cells[cellIndex].locked) return;
            if (!this.$store.state.lockCorrectCells ||
                parseInt(this.cells[cellIndex].guess) !== parseInt(this.cells[cellIndex].actual)) {
                this.$store.dispatch('autoTrimNotes', {cellIndex, guess});
            }
            this.$store.commit('toggleCellGuess', {cellIndex: cellIndex, guess: guess});
            this.$store.dispatch('saveGame');
        },
        secondsToMMSS(seconds) {
            return Math.floor(seconds / 60) + ':' + (seconds % 60).toString().padStart(2, '0');

        }
    },
    computed: {
        theme() {
            return this.$store.state.themeDark ? 'Dark' : 'Light';
        },
        level() {
            return this.$store.state.level;
        },
        paused() {
           return this.$store.state.paused;
        },
        historyLength() {
            return this.$store.state.history.length;
        },
        solved() {
            return this.$store.state.solved;
        },
        isValidationOn() {
            return this.$store.state.validation;
        },
        ready() {
            return this.$store.state.ready;
        },
        cells() {
            return this.$store.state.cells;
        },
        selectedCell: {
            get() {
                return this.$store.state.selectedCell;
            },
            set(value) {
                this.$store.commit('selectedCell', value);
            }
        },
        selectedDigit: {
            get() {
                return this.$store.state.selectedDigit;
            },
            set(value) {
                this.$store.commit('selectedDigit', value);
            }
        },
        isNotesMode: {
            get() {
                return this.$store.state.isNotesMode
            },
            set(value) {
                this.$store.commit('notesMode', value);
            }
        }
    }
}
