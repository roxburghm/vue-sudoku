<!--suppress ALL -->
<template>
    <div
            @touchstart="cellDragStart"
            @touchend="cellDragEnd"
            @touchmove="cellDragging"
    >
        <div class="sudoku-grid shrink d-inline-block overflow-x-hidden text-no-wrap">
            <div v-for="blockRow in [1,2,3]" :key="`br-${blockRow}`" class="grid-row">
                <sudoku-block v-for="blockCol in [1,2,3]" :key="`bc-${blockCol}`"
                              :col="blockCol" :row="blockRow" :transparent-cells="draggedCells"
                              :class="`sudoku-block-${blockRow}-${blockCol}`"/>
            </div>
        </div>
    </div>
</template>

<script>
import SudokuBlock from "@/components/SudokuBlock.vue";

export default {
    name: "SudokuGrid",
    components: {SudokuBlock},
    data() {
        return {
            draggedCells: [],
            dragStartTimer: null,
        }
    },
    methods: {
        findCellIndexOfMoveEvent(event) {
            let element = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
            while (element) {
                if (element.classList && element.classList.contains('sudoku-cell')) {
                    return element.getAttribute('data-cell-index')
                }
                element = element.parentNode;
            }
            return null;
        },
        cellDragStart() {
            if (!this.$store.state.dragToScrub || this.selectedDigit < 1) {
                return;
            }
            this.draggedCells = [];
            this.dragStartTimer = setTimeout(() => {
                navigator.vibrate(50);
                this.dragStartTimer = null;
            }, 500);
        },
        cellDragging(event) {
            if (!this.$store.state.dragToScrub || this.selectedDigit < 1 || this.dragStartTimer !== null) {
                return;
            }
            event.prevent();
            let cell = this.findCellIndexOfMoveEvent(event);

            if (cell === null || this.draggedCells.includes(cell))
                return;

            if (this.$store.state.cells[cell].locked) {
                return;
            }

            this.draggedCells.push(cell);
        },
        cellDragEnd() {
            if (this.dragStartTimer) {
                window.clearTimeout(this.dragStartTimer);
                this.dragStartTimer = null;
                return;
            }

            if (!this.$store.state.dragToScrub || this.selectedDigit < 1) {
                return;
            }
            // OK we have a list of cells, if we have a keypad value selected we need to clear the note
            // for this digit in each cell.


            for (let cell of this.draggedCells) {
                this.$store.commit('setCellNote', {cellIndex: cell, digit: this.selectedDigit, value: false});
            }

            this.draggedCells = [];
        }
    },
    computed: {}
}
</script>
<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

:root {

  --sudoku-cell-size: 55px;
  --sudouku-block-border: 4px;
  --sudouku-cell-border: 1px;
  --sudouku-block-border-color: #20a8e7;
  --sudouku-cell-border-color: grey;
  --sudouku-grid-border: 4px;
  --sudouku-grid-border-overhang: 8px;
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  :root {
    --sudoku-cell-size: 39px;
  }
}
</style>

<style scoped>
.sudoku-block-1-1, .sudoku-block-1-2, .sudoku-block-1-3 {
    padding-top: var(--sudouku-grid-border-overhang);
}

.sudoku-block-3-1, .sudoku-block-3-2, .sudoku-block-3-3 {
    padding-bottom: var(--sudouku-grid-border-overhang);
}

.sudoku-block-1-1, .sudoku-block-2-1, .sudoku-block-3-1 {
    padding-left: var(--sudouku-grid-border-overhang);
}

.sudoku-block-1-3, .sudoku-block-2-3, .sudoku-block-3-3 {
    padding-right: var(--sudouku-grid-border-overhang);
}

.sudoku-block-1-1, .sudoku-block-1-2, .sudoku-block-2-1, .sudoku-block-2-2 {
    border-right: var(--sudouku-block-border) solid var(--sudouku-block-border-color);
    border-bottom: var(--sudouku-block-border) solid var(--sudouku-block-border-color);
}

.sudoku-block-3-1, .sudoku-block-3-2 {
    border-right: var(--sudouku-block-border) solid var(--sudouku-block-border-color);
}

.sudoku-block-1-3, .sudoku-block-2-3 {
    border-bottom: var(--sudouku-block-border) solid var(--sudouku-block-border-color);
}

</style>
