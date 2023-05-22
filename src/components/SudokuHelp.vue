<template>
    <v-card>
        <v-card-title class="justify-center headline">Help</v-card-title>
        <v-card-text class="font-weight-light">
            <v-divider/>
            <v-simple-table>
                <tbody>
                <SudokuHelpItem icon="mdi-help" title="Help" text="Shows this help"/>
                <SudokuHelpItem icon="mdi-dots-grid" title="Automatic notes" text="Fills in all empty squares with the values that are not already in the row, column or block"/>
                <SudokuHelpItem icon="mdi-refresh" title="New Game" text="Asks for a new difficulty level and starts a new game "/>
                <SudokuHelpItem icon="mdi-undo" title="Undo Move" text="Undoes the last guess or note edit"/>
                <SudokuHelpItem icon="mdi-eraser" title="Eraser" text="Clears the selected cell"/>
                <SudokuHelpItem icon="mdi-pause" title="Pause" text="Pauses the game and the timer"/>
                <SudokuHelpItem icon="mdi-cog" title="Settings" text="Game settings"/>
                <SudokuHelpItem icon="mdi-coffee-to-go-outline" title="Buy me a coffee" text="Allows you to mae a small donation to buy me a coffee. There are no ads and you can turn this icon off in the settings."/>
                </tbody>
            </v-simple-table>
            <v-divider class="my-4"/>
            <div class="subtitle-1">Number entry</div>
            <p>If you select a cell on the grid (highlighted blue) then can use the keypad to enter a guess or make notes into that call. Alternatively if you select a digit on the keypad
                you can tap on the grid to enter that digit into the cells guess or notes fields.</p>
            <div class="subtitle-1">Notes</div>
            <p>To enter notes click the pencil icon to enter notes mode and enter digits as above. To quickly clear notes, ensure you have Drag To Clear enabled in settings, and hold on a cell until the phone vibrates, then drag your finger across the cells you want to clear the notes for currently select digit. As you enter a cell guess the note for that digit is automatically removed for the row, cell, block.</p>

            <v-divider class="my-4"/>

            <div class="subtitle-1">Assist: Allow automatic notes</div>
            <p>When enabled the puzzle can be filled with notes. The notes are set excluding any guesses in the block, row or column.</p>

            <div class="subtitle-1">Assist: Allow validation</div>
            <p>When enabled validation mode can be toggled on and off using the keypad. When on any cells that are wrong are highlighted.</p>


            <div class="subtitle-1">Assist: Highlight single notes</div>
            <p>When enabled any cell containing just a single note value will be highlighted</p>

            <div class="subtitle-1">Assist: Double Tap to complete a single note</div>
            <p>When enabled any cell containing just a single note can be double tapped to turn that into a guess.</p>

            <v-divider class="my-4"/>

            <div class="subtitle-1">Keyboard shortcuts</div>
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
            <p class="grey--text font-weight-light">Contact author via <a href="mailto:matt@roxburghm.com" class="text-decoration-none"><span class="secondary--text">matt<v-icon small color="secondary">mdi-at</v-icon>roxburghm.com</span></a> if you find any problems.</p>
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
