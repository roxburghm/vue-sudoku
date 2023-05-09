<template>
    <v-container class="justify-center d-flex">

        <v-sheet max-width="600">
            <div class="headline mb-8">
                <v-btn class="mr-4" :to="{name: 'GameView'}" icon>
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                Settings
            </div>
            <SettingItem icon="mdi-theme-light-dark" label="Dark theme">
                <v-switch color="sudoku" v-model="darkTheme"/>
            </SettingItem>

            <SettingItem icon="mdi-check" label="Allow validation">
                <v-switch color="sudoku" v-model="allowValidation"/>
            </SettingItem>

            <SettingItem icon="mdi-dots-grid" label="Allow automatic notes">
                <v-switch color="sudoku" v-model="allowAutoNotes"/>
            </SettingItem>

            <SettingItem icon="mdi-vibrate" label="Vibrate on digit complete">
                <v-switch color="sudoku" v-model="vibrateOnDigitComplete"/>
            </SettingItem>

            <SettingItem icon="mdi-marker" label="Highlight notes containing single value">
                <v-switch color="sudoku" v-model="highlightSingleNote"/>
            </SettingItem>
        </v-sheet>
    </v-container>
</template>/
<script>

import SettingItem from "@/views/SettingItem.vue";

export default {
    name: 'HighScores',
    components: {SettingItem},
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
        },
        highlightSingleNote: {
            get() {
                return this.$store.state.highlightSingleNote
            },
            set(value) {
                this.$store.commit('highlightSingleNote', value)
            }
        }
    }
}
</script>
