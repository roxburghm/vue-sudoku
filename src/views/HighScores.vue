<template>
    <v-sheet class="px-2 py-4">
        <div class="text-center">
            <div class="headline">{{ praise }}</div>
            <div class="my-6">
                <v-icon v-if="highScore" color="pink darken-1" size="128">mdi-cupcake</v-icon>
                <v-avatar v-else size="128">
                    <v-img contain width="128" src="/images/icons/maskable_icon.png"/>
                </v-avatar>
            </div>
            <div class="headline mb-2">High Scores - {{ level }}</div>
            <v-simple-table dense>
                <tbody>
                <tr v-for="(entry, index) in highScores" :key="`tr-${index}`"
                    :class="{ 'its-me' : gameId === entry.gameId }">
                    <td class="text-left">{{ entry.when|asDateTime }}</td>
                    <td class="text-right">{{ secondsToMMSS(entry.time) }}</td>
                </tr>
                </tbody>
            </v-simple-table>
            <v-btn outlined class="mt-4" :to="{ name: 'GameView' }">Restart</v-btn>
        </div>
    </v-sheet>
</template>
<script>
export default {
    name: 'HighScores',
    data() {
        return {
            showHighScores: false
        }
    },
    computed: {
        highScores() {
            console.log(this.level, this.$store.state.highScores)
            return this.$store.state.highScores[this.level]
        },
        highScore() {
            return this.$store.state.highScore
        },
        gameId() {
            return this.$store.state.gameId
        },
        praise() {
            return this.highScore ? 'Congratulations!' : 'Finished'
        }
    }
}
</script>
<style scoped>
.its-me {
    color: var(--sudoku-cell-selected-text-color);
    background-color: var(--sudoku-cell-selected-color);
}
</style>