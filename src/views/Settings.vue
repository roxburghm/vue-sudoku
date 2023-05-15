<template>
    <v-container class="justify-center d-flex">
        <v-sheet max-width="600" class="px-4 transparent">
            <div class="headline my-8">
                <v-btn class="mr-4" :to="{name: 'GameView'}" icon>
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                Settings
            </div>
            <SettingItem icon="mdi-theme-light-dark" label="Dark theme">
                <v-switch color="sudoku" v-model="darkTheme"/>
            </SettingItem>
            <SettingItem icon="mdi-palette" label="Color">
                <color-swatch
                        class="mr-2 my-4"
                        :color="color" :key="color" v-for="color in colors" @click="selectThemeColor(color)"/>
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

            <SettingItem icon="mdi-timer-outline" label="Show countdown timer bar">
                <v-switch color="sudoku" v-model="showCountdown"/>
            </SettingItem>
            <SettingItem icon="mdi-gesture-swipe-right" label="Drag across board to clear notes">
                <v-switch color="sudoku" v-model="dragToScrub"/>
            </SettingItem>
        </v-sheet>
    </v-container>
</template>/
<script>

import SettingItem from "@/views/SettingItem.vue";
import Themer from "@/plugins/themer";
import ColorSwatch from "@/views/ColorSwatch.vue";

export default {
    name: 'HighScores',
    components: {ColorSwatch, SettingItem},
    data() {
        return {
            showHighScores: false
        }
    },
    methods: {
        selectThemeColor(color) {
            this.$store.commit('themeColor', color);
            Themer.SetThemeColor(color, this.$vuetify);
        }
    },
    computed: {
        colors() {
            return Themer.AvailableThemes;
        },
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
        showCountdown: {
            get() {
                return this.$store.state.showCountdown
            },
            set(value) {
                this.$store.commit('showCountdown', value)
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
        },
        dragToScrub: {
            get() {
                return this.$store.state.dragToScrub
            },
            set(value) {
                this.$store.commit('dragToScrub', value)
            }
        }
    }
}
</script>
