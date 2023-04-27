<template>
    <v-card>
        <v-card-title class="justify-center headline">Help</v-card-title>
        <v-card-text>
            <v-divider/>
            <v-simple-table>
                <tbody>
                <SudokuHelpItem icon="mdi-help" title="Help" text="Shows this help"/>
                <SudokuHelpItem icon="mdi-dots-grid" title="Auto Hints" text="Fills in all unguessed squares with the values that are not already in the row, column or block"/>
                <SudokuHelpItem icon="mdi-refresh" title="New Game" text="Asks for a new difficulty level and starts a new game "/>
                <SudokuHelpItem icon="mdi-undo" title="Undo Move" text="Undoes the last guess or note edit"/>
                <SudokuHelpItem icon="mdi-eraser" title="Eraser" text="Clears the selected cell"/>
                </tbody>
            </v-simple-table>
            <v-divider class="my-4"/>
            <p>Entry Hint: If you select a cell on the grid (highlighted blue) then can use the keypad to enter a guess or make notes into that call. Alteratively if you select a digit on the keypad
                you can tap on the grid to enter that digit into the cells guess or notes fields.</p>
            <v-divider class="my-4"/>
            <p>Sudoku is also accessible via the keyboard. The following shortcuts are available:</p>
            <v-simple-table dense>
                <tbody>
                 <SudokuHelpKey key-code="1-9" action="Digit 1-9" />
                 <SudokuHelpKey key-code="0, delete" action="Erase" />
                 <SudokuHelpKey key-code="N" action="Toggle notes mode" />
                 <SudokuHelpKey key-code="Ctrl V" action="Toggle validation" />
                 <SudokuHelpKey key-code="Ctrl Z" action="Undo previous move" />
                 <SudokuHelpKey key-code="Ctrl-Alt R" action="Restart game" />
                 <SudokuHelpKey key-code="Ctrl-Alt N" action="Insert automatic notes into the puzzle" />
                 <SudokuHelpKey key-code="?" action="This help" />
                </tbody>
            </v-simple-table>
            <v-divider class="my-4"/>
            <p class="grey--text font-weight-light">Contact author via <span class="secondary--text">matt<v-icon small color="secondary">mdi-at</v-icon>roxburghm.com</span> if you find any problems.</p>
            <p class="grey--text font-weight-light font-italic">{{ version}}</p>
            <div class="justify-center text-center">
                <v-btn  @click="$emit('close-dialog')">Close</v-btn>
            </div>

        </v-card-text>
    </v-card>
</template>
<script>
import SudokuHelpItem from "@/components/SudokuHelpItem.vue";
import SudokuHelpKey from "@/components/SudokuHelpKey.vue";

export default {
    name: 'SudokuHelp',
    components: {SudokuHelpItem, SudokuHelpKey},
    computed: {
        version() {
            return `V${process.env.VUE_APP_VERSION} #${process.env.VUE_APP_GIT_HASH}`;
        }
    }
}
</script>
