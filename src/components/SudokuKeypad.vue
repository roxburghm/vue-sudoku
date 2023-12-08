<template>
    <div :class="{ 'disabled': paused}">
        <v-divider class="my-3"
                   v-shortkey="{ up: ['arrowup'], down: ['arrowdown'], left: ['arrowleft'], right: ['arrowright']}"
                   @shortkey="cursorMove"/>
        <div class="d-flex flex-row justify-center">
            <sudoku-key :small="isSmallButton" @click="toggleDigit(1)" :digit="1" :selected="1 === selectedDigit"
                        :shortcut="['1']"/>
            <sudoku-key :small="isSmallButton" @click="toggleDigit(2)" :digit="2" :selected="2 === selectedDigit"
                        :shortcut="['2']"/>
            <sudoku-key :small="isSmallButton" @click="toggleDigit(3)" :digit="3" :selected="3 === selectedDigit"
                        :shortcut="['3']"/>
            <sudoku-key :small="isSmallButton" @click="toggleDigit(4)" :digit="4" :selected="4 === selectedDigit"
                        :shortcut="['4']"/>
            <sudoku-key :small="isSmallButton" @click="toggleDigit(5)" :digit="5" :selected="5 === selectedDigit"
                        :shortcut="['5']"/>
        </div>
        <div class="d-flex flex-row justify-center">
            <sudoku-key :small="isSmallButton" @click="toggleDigit(6)" :digit="6" :selected="6 === selectedDigit"
                        :shortcut="['6']"/>
            <sudoku-key :small="isSmallButton" @click="toggleDigit(7)" :digit="7" :selected="7 === selectedDigit"
                        :shortcut="['7']"/>
            <sudoku-key :small="isSmallButton" @click="toggleDigit(8)" :digit="8" :selected="8 === selectedDigit"
                        :shortcut="['8']"/>
            <sudoku-key :small="isSmallButton" @click="toggleDigit(9)" :digit="9" :selected="9 === selectedDigit"
                        :shortcut="['9']"/>
            <sudoku-key :small="isSmallButton" @click="toggleDigit(0)" :digit="0" :selected="0 === selectedDigit"
                        :shortcut="{ zero: ['0'], e: ['e'], backspace: ['backspace' ], delete: ['del'] }"
                        :icon="svgIcons.mdiEraser"/>
        </div>
        <v-divider class="my-3"/>
        <div class="d-flex flex-row justify-center">
            <sudoku-key
                    v-if="allowValidation"
                    :color="isValidationOn ? 'secondary' : 'gray'" :small="isSmallButton" :selected="isValidationOn"
                    @click="toggleValidation" :icon="svgIcons.mdiCheck" :shortcut="['ctrl', 'v']"/>
            <sudoku-key
                    v-if="allowAutoNotes"
                    color="gray" :small="isSmallButton" @click="autoNotes" @clickx="autoNotes" :icon="svgIcons.mdiDotsGrid"
                    :shortcut="['ctrl', 'alt', 'n']"/>
            <sudoku-key color="gray" :small="isSmallButton" @click="isRestartVisible = true" :icon="svgIcons.mdiRefresh"
                        :shortcut="['ctrl', 'alt', 'r']"/>
            <sudoku-key color="gray" :small="isSmallButton" :disabled="historyLength === 0" @click="undo"
                        :icon="svgIcons.mdiUndo" :shortcut="['ctrl', 'z']"/>
            <sudoku-key :color="isValidationOn ? 'secondary' : 'gray'" :small="isSmallButton" @click="toggleNotesMode"
                        :selected="isNotesMode" :icon="svgIcons.mdiPencil" :shortcut="['n']"/>
        </div>

        <v-dialog v-model="isRestartVisible" max-width="500" content-class="rounded-xl">
            <SudokuRestart @difficulty="difficultySelect" @close-dialog="isRestartVisible = false" title="Restart?"
            cancel="Continue current game">
                <p>Select a new difficulty level to restart</p>
            </SudokuRestart>
        </v-dialog>

    </div>
</template>

<script>
import SudokuKey from "@/components/SudokuKey.vue";
import SudokuRestart from "@/components/SudokuRestart.vue";

export default {
    name: "SudokuKeypad",
    components: {SudokuRestart, SudokuKey},
    data() {
        return {
            isRestartVisible: false
        }
    },
    methods: {
        cursorMove(e) {
            if (this.selectedCell < 0) {
                this.selectedCell = 41;
            }
            switch (e.srcKey) {
                case 'left':
                    if (this.selectedCell % 9 !== 0) {
                        this.selectedCell--;
                    }
                    break;
                case 'up':
                    if (this.selectedCell >= 9) {
                        this.selectedCell -= 9;
                    }
                    break;
                case 'down':
                    if (this.selectedCell + 9 < 81) {
                        this.selectedCell += 9;
                    }
                    break;
                case 'right':
                    if ((this.selectedCell + 1) % 9 !== 0) {
                        this.selectedCell++;
                    }
                    break;
            }
        },
        undo() {
            this.$store.dispatch('undo');
        },
        toggleValidation() {
            this.$store.commit('toggleValidation');
        },
        difficultySelect(difficulty) {
            this.isRestartVisible = false;
            this.$emit('difficulty', difficulty);
        },
        autoNotes() {
            this.$store.commit('pushGameHistory');
            this.$store.dispatch(this.hasNotes ? 'clearNotes' : 'autoNotes');
            if (process.env.VUE_APP_TEST_AUTO_PASS) {
                this.$store.dispatch('autoPass');
            }

            this.$store.dispatch('saveGame');
        },
        autoPass() {
            this.$store.dispatch('autoPass');
        },
        toggleNotesMode() {
            this.isNotesMode = !this.isNotesMode;
        },
        toggleDigit(digit) {
            if (this.selectedCell >= 0) {
                this.$store.commit('pushGameHistory');
                this.toggleCellGuessOrNote(this.selectedCell, digit)
            } else {
                this.selectedDigit = this.selectedDigit === digit ? -1 : digit;
            }
        }
    },
    computed: {
        hasNotes() {
            return this.cells.reduce((acc, value) => {
                return acc || value.notes.reduce((acc, value) => acc || value, false)
            }, false);
        },
        isSmallButton() {
            return this.$vuetify.breakpoint.smAndDown;
        },
        allowValidation() {
            return this.$store.state.allowValidation;
        },
        allowAutoNotes() {
            return this.$store.state.allowAutoNotes;
        },
    }
}
</script>

<style scoped>
.disabled {
    opacity: 0.3;
}
</style>

<style lang="sass" scoped>
$dialog-border-radius: 80px
</style>