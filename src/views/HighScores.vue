<template>
    <v-sheet class="px-2 py-4">
        <div class="text-center">
            <div class="headline">{{ praise }}</div>
            <div class="my-6">
                <v-icon v-if="highScore" color="pink darken-1" size="128">mdi-cupcake</v-icon>
                <v-avatar v-else size="128">
                    <v-img contain width="128" :src="`/images/logoFor${theme}.png`"/>
                </v-avatar>
            </div>
            <div class="my-4">
                <v-chip outlined large class="px-6" color="black">Your time in {{level}} mode <span class="mx-2 grey--text text--lighten-1">&mdash;</span><elapsed-time :seconds="secondsTaken" /></v-chip>
            </div>
            <v-divider class="my-4"/>

            <v-carousel v-model="showLevel" :show-arrows="true" :continuous="false" hide-delimiter-background hide-delimiters>
                <v-carousel-item v-for="hLevel in levels" :key="`level-${hLevel}`">
                    <v-sheet>
                    <div class="headline mb-2 text-capitalize">High Scores - {{ hLevel }} Mode</div>
                    <v-simple-table dense style="max-width: 600px" class="mx-auto">
                        <tbody>
                        <tr v-for="(entry, index) in getHighScoresForLevel(hLevel)" :key="`tr-${index}`"
                            :class="{ 'its-me' : gameId === entry.gameId }">
                            <td class="right placement grey--text">{{ index + 1 }}.</td>
                            <td class="text-left">{{ entry.when|asDateTime }}</td>
                            <td class="text-right"><elapsed-time :seconds="entry.time" /></td>
                        </tr>
                        </tbody>
                    </v-simple-table>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <v-btn outlined class="mt-4" :to="{ name: 'GameView' }">Restart</v-btn>
        </div>
    </v-sheet>
</template>/
<script>
import ElapsedTime from "@/components/ElapsedTime.vue";
import {SudokuLevels} from "@/plugins/sudoku";

export default {
    name: 'HighScores',
    components: {ElapsedTime},
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
            return this.$store.state.highScores[level]
        },
    },
    computed: {
        highScore() {
            return this.$store.state.highScore
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
    color: var(--v-sudoku-cell-selected-text-color-base);
    background-color: var(--v-sudoku-cell-selected-color-base);
}

.placement {
    width: 2em;
}
</style>
