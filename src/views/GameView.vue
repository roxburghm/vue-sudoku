<template>
    <div class="d-block fill-height">

        <div v-if="!ready" class="fill-height align-center text-center justify-center d-flex flex-column">
            <div>
                <v-img width="128" height="128" src="/images/icons/android-chrome-192x192.png"/>
            </div>
            <div class="headline font-weight-light mt-6">Generating ...</div>
        </div>
        <v-container v-else class="text-center">
            <v-chip outlined color="grey" class="my-4" small>Difficulty:
                <span class="text-capitalize">{{ level }}</span> &mdash; {{  elapsed  }}
            </v-chip>
            <sudoku-grid/>
            <sudoku-keypad @difficulty="difficultySelect"/>
        </v-container>
        <v-dialog v-model="finished" max-width="500" persistent>
            <SudokuRestart @difficulty="difficultySelect" title="Congratulations!" :cancellable="false">
                <div class="text-center">
                    <v-icon color="secondary" size="128">mdi-cupcake</v-icon>
                    <p>You have solved the puzzle. Select a difficulty level to try again</p>
                </div>
            </SudokuRestart>
        </v-dialog>
    </div>
</template>

<script>
import SudokuGrid from "@/components/SudokuGrid.vue";
import SudokuKeypad from "@/components/SudokuKeypad.vue";
import SudokuRestart from "@/components/SudokuRestart.vue";

export default {
    name: 'GameView',
    components: {
        SudokuRestart,
        SudokuKeypad,
        SudokuGrid
    },
    data() {
        return {
            intervalTimer: null
        }
    },
    mounted() {
        if (!this.ready) {
            this.$store.dispatch('loadGame', 1);
        }
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        this.startTimer();
    },
    beforeDestroy() {
        this.stopTimer();
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    },
    watch: {
        solved: {
            handler: function (val) {
                this.finished = val;
            },
            immediate: true
        },
    },
    methods: {
        handleVisibilityChange() {
            if (document.hidden) {
                this.stopTimer()
            } else {
                this.startTimer()
            }
        },
        startTimer() {
            this.stopTimer();
            this.intervalTimer = setInterval(() => {
                this.$store.commit('secondsTakenInc');
            }, 1000);
        },
        stopTimer() {
            if (this.intervalTimer) {
                clearInterval(this.intervalTimer);
                this.intervalTimer = null;
            }
        },
        difficultySelect(difficulty) {
            this.$store.commit('ready', false);
            this.finished = false;
            setTimeout(() => {
                this.$store.dispatch('newPuzzle', difficulty);
            }, 200);
        },
    },
    computed: {
        elapsed() {
            return Math.floor(this.$store.state.secondsTaken / 60) + ':' + (this.$store.state.secondsTaken % 60).toString().padStart(2, '0');
        }
    }
}
</script>
