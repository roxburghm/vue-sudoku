<!--suppress ALL -->
<template>
    <div>
        <div class="sudoku-grid shrink d-inline-block overflow-x-hidden text-no-wrap">
            <div v-for="blockRow in [1,2,3]" :key="`br-${blockRow}`" class="grid-row">
                <sudoku-block v-for="blockCol in [1,2,3]" :key="`bc-${blockCol}`"
                              :col="blockCol" :row="blockRow"
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
    computed: {}
}
</script>
<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

:root {

  --sudoku-cell-size: 50px;
  --sudouku-block-border: 4px;
  --sudouku-cell-border: 1px;
  --sudouku-block-border-color: #20a8e7;
  --sudouku-cell-border-color: grey;
  --sudouku-grid-border: 4px;
  --sudouku-grid-border-overhang: 8px;
}

@media #{map-get($display-breakpoints, 'xs')} {
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
