<template>
    <v-sheet class="px-2 py-4">
        <div class="text-center">
            <div class="headline font-weight-light">{{ praise }}</div>
            <div class="my-6">
                <div class="my-6">
                    <div v-if="highScore" style="--v-sudoku-base: var(--v-gold-base)">
                    <sudoku-logo v-if="myPosition() === 1" :icon="svgIcons.mdiCupcake" :size="64" color="gold" class="breathe"/>
                    <sudoku-logo :icon="svgIcons.mdiCupcake" :size="128" color="gold" class="breathe mx-6"/>
                    <sudoku-logo v-if="myPosition() === 1" :icon="svgIcons.mdiCupcake" :size="64" color="gold" class="breathe"/>
                    </div>
                    <sudoku-logo v-else :size="128" :rotated="false" :icon="svgIcons.mdiCheckCircleOutline" class="breathe"/>
                </div>
                <div class="my-4">
                    <v-chip outlined large class="px-6" color="black">Your time in {{ level }} mode <span
                            class="mx-2 grey--text text--lighten-1">&mdash;</span>
                        <elapsed-time :seconds="secondsTaken"/>
                    </v-chip>
                </div>

                <v-carousel v-model="showLevel" :show-arrows="false" :continuous="false" class="mt-6"
                            hide-delimiter-background hide-delimiters height="360">
                    <v-carousel-item v-for="hLevel in levels" :key="`level-${hLevel}`">
                        <v-sheet elevation="0">
                            <div class="headline text-capitalize font-weight-light sudoku--text">High Scores - {{ hLevel }} Mode</div>
                            <v-divider class="mb-2 sudoku"/>
                            <v-simple-table dense style="max-width: 500px" class="mx-auto">
                                <tbody>
                                <tr v-for="(entry, index) in getHighScoresForLevel(hLevel)" :key="`tr-${index}`"
                                    :class="{ 'its-me' : gameId === entry.gameId }">
                                    <td class="right placement">{{ index + 1 }}.</td>
                                    <td class="text-left">
                                        <span v-if="entry.time">{{ entry.when|asDateTime }}</span></td>
                                    <td class="text-right">
                                        <elapsed-time v-if="entry.time" :seconds="entry.time"/>
                                    </td>
                                </tr>
                                </tbody>
                            </v-simple-table>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
                <v-btn outlined tabindex="-1" class="mt-4" @click="restart">
                    <span v-if="solved">Start new game</span>
                    <span v-else>Resume game</span>
                </v-btn>
            </div>
        </div>
    </v-sheet>
</template>/
<script>
import ElapsedTime from "@/components/ElapsedTime.vue";
import {SudokuLevels} from "@/plugins/sudoku";
import CloneDeep from 'lodash/cloneDeep';
import SudokuLogo from "@/components/SudokuLogo.vue";

const NO_OF_HIGH_SCORES = 10;

export default {
    name: 'HighScores',
    components: {SudokuLogo, ElapsedTime},
    data() {
        return {
            showHighScores: false,
            showLevel: 0,
            levels: [SudokuLevels.EASY, SudokuLevels.MEDIUM, SudokuLevels.HARD],
        }
    },
    mounted() {
        this.showLevel = this.levels.indexOf(this.level);
    },
    methods: {
        getHighScoresForLevel(level) {
            let scores = CloneDeep(this.$store.state.highScores[level]);
            if (scores.length < NO_OF_HIGH_SCORES) {
                for (let i = scores.length; i < NO_OF_HIGH_SCORES; i++) {
                    scores.push({time: 0, when: '', gameId: 0});
                }
            }
            return scores;
        },
        restart() {
            this.$router.push({ name: 'GameView' })
        },
        myPosition() {
            return this.getHighScoresForLevel(this.level).findIndex(entry => entry.gameId === this.gameId) +1;
        }
    },
    computed: {
        highScore() {
            return this.myPosition() > 0;
        },
        gameId() {
            return this.$store.state.gameId
        },
        secondsTaken() {
            return this.$store.state.secondsTaken;
        },
        praise() {
            return this.highScore ? 'Congratulations!' : 'Finished'
        }
    }
}
</script>
<style scoped>
.its-me {
    color: var(--v-sudoku-cell-color-base);
    background-color: var(--v-sudoku-base);
}

.placement {
    width: 2em;
    opacity: 0.7;
}
</style>
