<template>
    <div class="d-block fill-height">
        <v-progress-linear v-if="showCountdown" :value="pcntTimeLeftHighScore" reverse
                           color="sudoku-progress" :background-opacity="0"/>
        <v-progress-linear v-if="showCountdown" :value="pcntTimeLeftTopScore" reverse
                           color="sudoku-progress-high-score" :background-opacity="0"/>

        <div v-if="!ready" class="fill-height align-center text-center justify-center d-flex flex-column">
            <div>
                <v-img width="128" height="128" :src="`/images/logoFor${theme}.png`"/>
            </div>
            <div class="headline font-weight-light mt-6">Generating ...</div>
        </div>
        <v-container v-else class="text-center">
            <v-chip outlined color="grey" class="my-4" small>Difficulty:
                <span class="text-capitalize mx-1">{{ level }}</span> <span class="mx-1 grey--text text--lighten-2">&mdash;</span>
                <elapsed-time :seconds="$store.state.secondsTaken"/>
            </v-chip>
            <sudoku-grid/>
            <sudoku-keypad @difficulty="difficultySelect"/>
        </v-container>
    </div>
</template>

<script>
import SudokuGrid from "@/components/SudokuGrid.vue";
import SudokuKeypad from "@/components/SudokuKeypad.vue";
import ElapsedTime from "@/components/ElapsedTime.vue";

export default {
    name: 'GameView',
    components: {
        ElapsedTime,
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
        slowestTime() {
            let highScoreCount = this.$store.state.highScores[this.level].length;
            if (highScoreCount === 0) return 0;
            return 30; // this.$store.state.highScores[this.level][highScoreCount - 1].time;
        },
        fastestTime() {
            if (this.$store.state.highScores[this.level].length === 0) return 0;
            return 15; //this.$store.state.highScores[this.level][0].time;
        },
        pcntTimeLeftTopScore() {
            if (this.slowestTime === 0) return 0;
            let pcntTimeLeft = 100 - (this.$store.state.secondsTaken / this.fastestTime * 100);
            return pcntTimeLeft < 0 ? 0 : pcntTimeLeft;
        },
        pcntTimeLeftHighScore() {
            if (this.slowestTime === 0) return 0;
            let pcntTimeLeft = 100 - (this.$store.state.secondsTaken / this.slowestTime * 100);
            return pcntTimeLeft < 0 ? 0 : pcntTimeLeft;
        },
        showCountdown() {
            return this.$store.state.showCountdown;
        }
    }
}
</script>
