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
            this.$store.commit('toggleCellGuess', {cellIndex: cellIndex, guess: guess});
            this.$store.dispatch('autoTrimNotes', {cellIndex, guess});
            this.$store.dispatch('saveGame');
        }
    },
    computed: {
        level() {
            return this.$store.state.level;
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