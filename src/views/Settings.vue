<template>
    <v-container class="justify-center d-flex">

        <v-sheet max-width="600">
            <div class="headline">
                <v-btn class="mr-4" :to="{name: 'GameView'}" icon>
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                Settings
            </div>
            <v-row dense class="mt-8">
                <v-col cols="8" class="text-left align-center d-flex">
                    <v-icon left>mdi-theme-light-dark</v-icon>
                    Dark Theme
                </v-col>
                <v-col class="text-right justify-end d-flex">
                    <v-switch color="sudoku" v-model="darkTheme"/>
                </v-col>
                <v-col cols="12">
                    <v-divider/>
                </v-col>
                <v-col cols="8" class="text-left align-center d-flex">
                    <v-icon left>mdi-check</v-icon>
                    Allow validation
                </v-col>
                <v-col class="text-right justify-end d-flex">
                    <v-switch color="sudoku" v-model="allowValidation"/>
                </v-col>

                <v-col cols="12">
                    <v-divider/>
                </v-col>
                <v-col cols="8" class="text-left align-center d-flex">
                    <v-icon left>mdi-dots-grid</v-icon>
                    Allow automatic notes
                </v-col>
                <v-col class="text-right justify-end d-flex">
                    <v-switch color="sudoku" v-model="allowAutoNotes"/>
                </v-col>

                <v-col cols="12">
                    <v-divider/>
                </v-col>
                <v-col cols="8" class="text-left align-center d-flex">
                    <v-icon left>mdi-vibrate</v-icon>
                    Vibrate on digit complete
                </v-col>
                <v-col class="text-right justify-end d-flex">
                    <v-switch color="sudoku" v-model="vibrateOnDigitComplete"/>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
</template>/
<script>

export default {
    name: 'HighScores',
    data() {
        return {
            showHighScores: false
        }
    },
    computed: {
        darkTheme: {
            get() {
                return this.$store.state.themeDark
            },
            set(value) {
                this.$store.commit('themeDark', value);
                this.$vuetify.theme.dark = value;
            }
        },
        allowValidation: {
            get() {
                return this.$store.state.allowValidation
            },
            set(value) {
                this.$store.commit('allowValidation', value)
            }
        },
        allowAutoNotes: {
            get() {
                return this.$store.state.allowAutoNotes
            },
            set(value) {
                this.$store.commit('allowAutoNotes', value)
            }
        },
        vibrateOnDigitComplete: {
            get() {
                return this.$store.state.vibrateOnDigitComplete
            },
            set(value) {
                this.$store.commit('vibrateOnDigitComplete', value)
            }
        }
    }
}
</script>
<style scoped>
</style>
