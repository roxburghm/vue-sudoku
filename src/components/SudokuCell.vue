<template>
    <div class="sudoku-cell d-inline-block" @click="toggleCellSelect" :class="cellTypeClass + ' ' + cellAdditionalClass">
        <v-scale-transition origin="center center">
            <div class="sudoku-cell-indicator"></div>
        </v-scale-transition>
        <div class="sudoku-cell-content justify-center align-center">
            <div v-if="showNotes" class="sudoku-notes justify-center text-center d-flex fill-height align-center">
                <sudoku-notes :notes="cell.notes" :key="cellNotesKey"/>
            </div>
            <v-scale-transition origin="center center" v-else>
                <div class="guess" :class="`guess-${cellGuess}`" v-if="visible">
                    {{ cellGuess }}
                </div>
            </v-scale-transition>
        </div>

    </div>
</template>

<script>
import SudokuNotes from "@/components/SudokuNotes.vue";

export default {
    name: "SudokuCell",
    components: {SudokuNotes},
    props: {
        index: {type: Number, required: true}
    },
    data() {
        return {
            visible: true
        }
    },
    watch: {
        cellGuess() {
            this.visible = false;
            this.$nextTick(() => {
                this.visible = true;
            })
        }

    },
    methods: {
        toggleCellSelect() {
            if (this.cellLocked) return;
            if (this.selectedDigit < 0) {
                this.selectedCell = this.selectedCell === this.index ? -1 : this.index;
            } else {
                this.$store.commit('pushGameHistory');
                this.toggleCellGuessOrNote(this.index, this.selectedDigit)
                this.$store.dispatch('saveGame');
            }
        },
        containsDigit(digit) {
            if (digit) {
                return this.showNotes ? false : parseInt(this.cellGuess) === parseInt(digit);
            }
            return false;
        },
    },
    computed: {
        cellAdditionalClass() {
            return (this.showNotes ? 'cell-notes' : '') + ' ' + (this.cellLocked ? 'cell-locked' : '')
        },
        cellTypeClass() {
            // eslint-disable-next-line no-constant-condition
            if (this.isValidationOn && this.cellGuess !== '' && parseInt(this.cellGuess) !== parseInt(this.cellActual)) return 'cell-incorrect';
            if (this.cellSelected) return 'cell-selected';
            if (this.cellHighlighted) return 'cell-highlighted';
            if (this.cellLocked) return 'cell-locked';
            if (this.showNotes && this.noteCount === 1 && this.$store.state.highlightSingleNote) {
                return 'cell-single-note';
            }
            return '';
        },
        hasIndicator() {
            return this.cellSelected || this.cellLocked || this.cellHighlighted;
        },
        cellSelected() {
            return this.selectedCell === this.index;
        },
        cell() {
            return this.cells[this.index]
        },
        cellGuess() {
            return this.cell.guess
        },
        cellLocked() {
            return this.cell.locked
        },
        cellHighlighted() {
            if (this.selectedDigit >= 0) {
                return this.containsDigit(this.selectedDigit);
            } else if (this.selectedCell >= 0) {
                return this.containsDigit(this.cells[this.selectedCell].guess);
            }
            return false;
        },
        cellActual() {
            return this.cell.actual
        },
        noteCount() {
            return this.cell.notes.reduce((acc, note) => acc + note ? 1 : 0, 0);
        },
        hasNotes() {
            return this.cell.notes.reduce((acc, note) => acc || note, false);
        },
        showNotes() {
            return this.cellGuess === '' && (this.hasNotes || (this.isNotesMode && this.selectedCell === this.index));
        },
        cellNotesKey() {
            return 'cnk-' + this.cell.notes.join('');
        }
    }
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
.sudoku-cell {
    background-color: var(--v-sudoku-cell-color-base);
    width: var(--sudoku-cell-size);
    height: var(--sudoku-cell-size);
    overflow: hidden;
    margin: 0;
    padding: 5px;
    text-align: center;
    position: relative;
}

.sudoku-cell.cell-locked {
    background-color: var(--v-sudoku-cell-locked-color-base);
}
.sudoku-cell.cell-locked .sudoku-cell-indicator {
    background-color: var(--v-sudoku-cell-locked-color-base);
}

.sudoku-cell.cell-incorrect .sudoku-cell-indicator {
    background-color: var(--v-sudoku-cell-incorrect-color-base);
}

.sudoku-cell.cell-locked  {
    color: var(--v-sudoku-cell-locked-text-color-base);
}

.sudoku-cell.cell-incorrect  {
    color: var(--v-sudoku-cell-incorrect-text-color-base);
}

.sudoku-cell.cell-highlighted .sudoku-cell-indicator {
    border: 2px solid var(--v-sudoku-cell-highlighted-color-base);
}

.sudoku-cell.cell-highlighted  {
    color: var(--v-sudoku-cell-highlighted-text-color-base);
}


.sudoku-cell.cell-selected .sudoku-cell-indicator {
    background-color: var(--v-sudoku-cell-selected-color-base);
}
.sudoku-cell.cell-selected {
    color: var(--v-sudoku-cell-selected-text-color-base);
}

.sudoku-cell  {
    color: var(--v-sudoku-cell-text-color-base);
}

.cell-notes .sudoku-cell-indicator {
    border-radius: 10%;
}

.cell-single-note .sudoku-notes {
    background-color: var(--v-sudoku-cell-single-note-color-base);;
}

.sudoku-cell .sudoku-notes {
    font-weight: 600;
    font-size: calc(var(--sudoku-cell-size) * 0.2);
    line-height: calc(var(--sudoku-cell-size) * 0.2);
    font-variant-numeric: tabular-nums lining-nums;
}

.sudoku-cell-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.sudoku-cell-indicator {
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 50%;
    background-color: transparent;
}

.sudoku-cell .guess {
    margin: auto;
    font-variant-numeric: tabular-nums lining-nums;
    font-size: calc(var(--sudoku-cell-size) * 0.7);
    line-height: var(--sudoku-cell-size);
}

.sudoku-cell .guess.guess-4, .sudoku-cell .guess.guess-5 {
    margin-left: -2px;
}
</style>
