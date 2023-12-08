<template>
    <v-container class="justify-center d-flex">
        <v-sheet max-width="600" class="px-4 transparent">
            <div class="headline font-weight-light">
                UI Settings
            </div>
            <p class="font-weight-light caption">Change the way the app looks and feels.</p>
            <SettingItem :icon="svgIcons.mdiThemeLightDark" label="Dark theme">
                <v-switch color="sudoku" v-model="darkTheme"/>
            </SettingItem>
            <SettingItem :icon="svgIcons.mdiPalette" label="Color">
                <color-swatch
                        class="mr-2 my-4"
                        :color="color" :key="color" v-for="color in colors" @click="selectThemeColor(color)"/>
            </SettingItem>
            <SettingItem :icon="svgIcons.mdiVibrate" label="Vibrate on digit complete, error and countdown">
                <v-switch color="sudoku" v-model="vibrateOnDigitComplete"/>
            </SettingItem>
            <SettingItem :icon="svgIcons.mdiTimerOutline" label="Show countdown timer bar">
                <v-switch color="sudoku" v-model="showCountdown"/>
            </SettingItem>
            <SettingItem :icon="svgIcons.mdiGestureSwipeRight" label="Drag across board to clear notes">
                <v-switch color="sudoku" v-model="dragToScrub"/>
            </SettingItem>



            <div class="headline font-weight-light mt-4">
                Assistive Settings
            </div>
            <p class="font-weight-light caption">Settings that make playing the game easier.</p>
            <SettingItem :icon="svgIcons.mdiCheck" label="Allow validation">
                <v-switch color="sudoku" v-model="allowValidation"/>
            </SettingItem>

            <SettingItem :icon="svgIcons.mdiDotsGrid" label="Allow automatic notes">
                <v-switch color="sudoku" v-model="allowAutoNotes"/>
            </SettingItem>

            <SettingItem :icon="svgIcons.mdiMarker" label="Highlight notes for current digit containing single value">
                <v-switch color="sudoku" v-model="highlightSingleNote"/>
            </SettingItem>

            <SettingItem :icon="svgIcons.mdiAutoFix" label="Complete single notes on double tap">
                <v-switch color="sudoku" v-model="completeSingleNote"/>
            </SettingItem>

            <SettingItem :icon="svgIcons.mdiPencilOff" label="Invisibly lock correct cells">
                <v-switch color="sudoku" v-model="lockCorrectCells"/>
            </SettingItem>

            <div class="headline font-weight-light mt-4">
                Buy Me A Coffee
            </div>
            <p class="font-weight-light caption">Like the app? Show your appreciation and buy me a coffee, but if you don't want to that's fine - you can turn off the coffee cup icon here. </p>
            <SettingItem :icon="svgIcons.mdiCoffeeToGoOutline" label="Hide buy me a coffee icon">
                <v-switch color="sudoku" v-model="hideCoffee"/>
            </SettingItem>
        </v-sheet>
    </v-container>
</template>/
<script>

import SettingItem from "@/components/SettingItem.vue";
import Themer from "@/plugins/themer";
import ColorSwatch from "@/components/ColorSwatch.vue";

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
        lockCorrectCells: {
            get() {
                return this.$store.state.lockCorrectCells
            },
            set(value) {
                this.$store.commit('lockCorrectCells', value);
            }
        },
        hideCoffee: {
            get() {
                return this.$store.state.hideCoffee
            },
            set(value) {
                this.$store.commit('hideCoffee', value);
            }
        },
        completeSingleNote: {
            get() {
                return this.$store.state.completeSingleNote
            },
            set(value) {
                this.$store.commit('completeSingleNote', value);
            }
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
