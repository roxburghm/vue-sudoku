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
                <span class="text-capitalize">{{ level }}</span> &mdash; {{ elapsed }}
            </v-chip>
            <sudoku-grid/>
            <sudoku-keypad @difficulty="difficultySelect"/>
        </v-container>
    </div>
</template>

<script>
import SudokuGrid from "@/components/SudokuGrid.vue";
import SudokuKeypad from "@/components/SudokuKeypad.vue";

export default {
    name: 'GameView',
    components: {
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
            if (this.$store.state.finished) {
                this.difficultySelect(this.level);
            } else {
                this.$store.dispatch('loadGame', 1);
            }
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
            handler: function (solved) {
                if (!this.$store.state.finished) {
                    if (solved) {
                        this.checkHighScore(this.level, this.$store.state.secondsTaken)
                        this.$store.commit('ready', false);
                        this.$store.commit('finished', true);
                        this.$router.replace({ name: 'HighScores' });
                    }
                }
            },
            immediate: true
        },
    },
    methods: {
        checkHighScore(level, time) {
            const highScores = this.$store.state.highScores[level];
            const gameId = this.$store.state.gameId;
            console.log('hs', this.$store.state.highScores, level);
            const slowestTime =
                highScores.length == 0 ? 99999 :
                    highScores[highScores.length - 1].time;

            console.log(time, slowestTime);
            if (time < slowestTime) {

                const newScore = { time: time, when: new Date().getTime(), gameId: gameId }
                this.$store.commit('addHighScore',
                    {level: level, score: newScore});
                return true;
            } else {
                return false;
            }
        },
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
                if (!this.$store.state.finished) this.$store.commit('secondsTakenInc');
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
            setTimeout(() => {
                this.$store.dispatch('newPuzzle', difficulty);
            }, 200);
        },
    },
    computed: {
        elapsed() {
            return this.secondsToMMSS(this.$store.state.secondsTaken);
        }
    }
}
</script>
