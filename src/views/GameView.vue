<template>
    <div class="d-block fill-height">
        <v-progress-linear absolute top v-if="showCountdown" :value="pcntTimeLeftTopScore" reverse
                          :buffer-value="pcntTimeLeftHighScore" :stream="pcntTimeLeftHighScore > 0" color="sudoku" />

        <div v-if="!ready" class="fill-height align-center text-center justify-center d-flex flex-column">
                <sudoku-logo :size="200" class="breathe" />
            <v-chip outlined class="font-weight-light px-6 mt-10" large>generating ...</v-chip>
        </div>
        <v-container v-else class="text-center">
            <v-chip outlined color="grey" class="my-4" small>Difficulty:
                <span class="text-capitalize mx-1">{{ level }}</span> <span class="mx-1 grey--text text--lighten-2">&mdash;</span>
                <elapsed-time :seconds="$store.state.secondsTaken"/>
            </v-chip>
            <v-avatar v-if="showCountdown && countdownClock" :style="countDownStyle"
                      color="sudoku white--text" class="countdown-timer breathe headline" size="36">{{ countdownClock }}</v-avatar>
            <div v-if="paused">
            <v-icon @click="$store.commit('togglePaused')" class="grid-size overflow-hidden" size="400"
                    color="sudoku">{{ svgIcons.mdiPauseCircleOutline }}</v-icon>
            </div>
            <sudoku-grid v-else/>
            <sudoku-keypad @difficulty="difficultySelect"/>
        </v-container>
    </div>
</template>

<script>
import SudokuGrid from "@/components/SudokuGrid.vue";
import SudokuKeypad from "@/components/SudokuKeypad.vue";
import ElapsedTime from "@/components/ElapsedTime.vue";
import SudokuLogo from "@/components/SudokuLogo.vue";

export default {
    name: 'GameView',
    components: {
        SudokuLogo,
        ElapsedTime,
        SudokuKeypad,
        SudokuGrid
    },
    data() {
        return {
            intervalTimer: null,
            countdownClock: '',
            countdownToHighScore: false
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
        secondsTaken: {
            handler: function (seconds) {
                let secondsLeftForHighScore = this.fastestTime - seconds;
                let secondsLeftForTopScore = this.slowestTime - seconds;
                let remainingSeconds = secondsLeftForHighScore > 0 ? secondsLeftForHighScore : secondsLeftForTopScore;
                this.countdownToHighScore = secondsLeftForHighScore > 0;
                if (remainingSeconds > 0 && remainingSeconds <= 10) {
                    this.countdownClock = remainingSeconds
                } else {
                    this.countdownClock = '';
                }
            },
            immediate: true
        },
        solved: {
            handler: function (solved) {
                if (!this.$store.state.finished) {
                    if (solved) {
                        this.checkHighScore(this.level, this.$store.state.secondsTaken)
                        this.$store.commit('ready', false);
                        this.$store.commit('finished', true);
                        this.$router.replace({name: 'HighScores'});
                    }
                }
            },
            immediate: true
        },
    },
    methods: {
        checkHighScore(level, time) {
            this.$store.commit('addHighScore',
                {level: level, time: time});
            return this.$store.state.highScore;
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
        secondsTaken() {
            return this.$store.state.secondsTaken;
        },
        slowestTime() {
            if (process.env.VUE_APP_TEST_HIGH_SCORE_TIMER) return 30;
            let highScoreCount = this.$store.state.highScores[this.level].length;
            if (highScoreCount === 0) return 0;
            return this.$store.state.highScores[this.level][highScoreCount - 1].time;
        },
        fastestTime() {
            if (process.env.VUE_APP_TEST_HIGH_SCORE_TIMER) return 15;
            if (this.$store.state.highScores[this.level].length === 0) return 0;
            return this.$store.state.highScores[this.level][0].time;
        },
        pcntTimeLeftTopScore() {
            if (this.slowestTime === 0) return 0;
            let pcntTimeLeft = 100 - (this.secondsTaken / this.fastestTime * 100);
            return pcntTimeLeft < 0 ? 0 : pcntTimeLeft;
        },
        pcntTimeLeftHighScore() {
            if (this.slowestTime === 0) return 0;
            let pcntTimeLeft = 100 - (this.secondsTaken / this.slowestTime * 100);
            return pcntTimeLeft < 0 ? 0 : pcntTimeLeft;
        },
        showCountdown() {
            return this.$store.state.showCountdown;
        },
        countDownStyle() {
            if (this.countdownToHighScore) {
                return '--v-sudoku-base: var(--v-gold-base);'
            } else {
                return ''
            }
        }
    }
}
</script>

<style>
.countdown-timer {
    position: absolute;
    right: 24px;
    top: 20px;
    animation-duration: 1s;
}

.grid-size {
    font-size: calc(var(--sudoku-block-border) * 2 + var(--sudoku-cell-border-size) * 6 + var(--sudoku-cell-size) * 9 + var(--sudoku-grid-border-overhang) * 2)  !important;
}
</style>
