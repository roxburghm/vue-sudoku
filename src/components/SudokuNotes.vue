<template>
    <table>
        <tr v-for="row in [1,4,7]" :key="`row-${row}`">
            <td v-for="col in [0,1,2]" :key="`note-${row}-${col}`" class="d-inline-block" :class="{ 'highlight-note' : isHighlighted(row+col) }">
                {{ getNoteChar(row + col) }}
            </td>

        </tr>
    </table>
</template>

<script>
export default {
    name: "SudokuNotes",
    props: {
        notes: { type: Array, required: true }
    },
    methods: {
        getNoteChar(i) {
            return this.notes[i - 1] ? i : ' ';
        },
        isHighlighted(i) {
            if (i !== this.selectedDigit) return false;

            return this.notes[this.selectedDigit - 1]
        }
    }
}
</script>

<style scoped>
td {
    width: calc(var(--sudoku-cell-size) * 0.2);
    height: calc(var(--sudoku-cell-size) * 0.2);
}
.highlight-note {
    background-color: var(--sudoku-cell-highlighted-color);
    border-radius: 30%;
    color:white;
}

</style>
