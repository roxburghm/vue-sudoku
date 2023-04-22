<template>
    <div class="d-inline-block sudoku-block">
        <div v-for="cellRow in [1,2,3]" :key="`cr-${cellRow}`" class="sudoku-row">
        <sudoku-cell v-for="cellCol in [1,2,3]" :key="`cc-${cellCol}`"
                     class="sudoku-cell" :class="`sudoku-cell-${cellRow}-${cellCol}`"
        :index="cellIndex(cellRow, cellCol)"/>
        </div>
    </div>
</template>

<script>
import SudokuCell from "@/components/SudokuCell.vue";

export default {
    name: "SudokuBlock",
    components: {SudokuCell},
    props: {
        row: { type: Number, required: true},
        col: { type: Number, required: true}
    },
    methods: {
        cellIndex(cellRow, cellCol) {
            return ((this.row - 1) * 3 + cellRow - 1) * 9 + (this.col -1) * 3 + cellCol - 1;
        },
    },
    computed: {
    }
}
</script>

<style scoped>

.sudoku-cell {
    vertical-align:top;
}

.sudoku-row {
    height: var(--sudoku-cell-size);
}

.sudoku-cell-1-1, .sudoku-cell-1-2, .sudoku-cell-2-1, .sudoku-cell-2-2 {
    border-right: var(--sudouku-cell-border) solid var(--sudouku-cell-border-color);
    border-bottom: var(--sudouku-cell-border) solid var(--sudouku-cell-border-color);
}

.sudoku-cell-1-3, .sudoku-cell-2-3 {
    border-bottom: var(--sudouku-cell-border) solid var(--sudouku-cell-border-color)
}

.sudoku-cell-3-1, .sudoku-cell-3-2 {
    border-right: var(--sudouku-cell-border) solid var(--sudouku-cell-border-color);
}

</style>
