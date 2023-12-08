<template>
    <v-app>
        <v-app-bar flat app :dark="$store.state.themeDark" light>
            <div class="d-flex align-center">
                <sudoku-logo :size="40"/>
                <span class="headline font-weight-light ml-2 grey--text">Sudoku</span>

            </div>

            <v-spacer></v-spacer>
            <div class="text-no-wrap">
                <a v-if="showCoffee"
                   href="https://www.buymeacoffee.com/matthewroxburgh" target="_blank" rel="noopener noreferrer"
                   class="text-decoration-none">
                    <v-btn icon large class="mr-2">
                        <v-icon>{{ svgIcons.mdiCoffeeToGoOutline}}</v-icon>
                    </v-btn>
                </a>
                <v-btn @click="togglePause" icon v-show="$route.name === 'GameView'" large class="mr-2">
                    <v-icon>{{ svgIcons.mdiPause }}</v-icon>
                </v-btn>
                <v-btn :color="$route.name === 'Settings' ? 'sudoku' : null" icon :to="{ name: $route.name === 'Settings' ? 'GameView' : 'Settings' }" large class="mr-2">
                    <v-icon>{{ svgIcons.mdiCog }}</v-icon>
                </v-btn>
                <v-btn icon @click="isHelpVisible = true" large
                       v-shortkey="{q: ['?'], shiftQ: ['shift', '?'], slash: ['/']}" @shortkey="isHelpVisible = true">
                    <v-icon>{{ svgIcons.mdiHelpCircleOutline }}</v-icon>
                </v-btn>
            </div>
        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>

        <v-dialog v-model="isHelpVisible" max-width="500" content-class="rounded-xl">
            <SudokuHelp @close-dialog="isHelpVisible = false" class=""/>
        </v-dialog>

        <v-dialog persistent :value="updateExists" :timeout="-1" color="black" outlined rounded max-width="400">
            <v-card>
                <v-card-text class="pa-8">
                    <div class="d-flex flex-column align-center">
                        <div class="new-container">
                            <v-avatar size="128">
                                <v-img contain width="128" src="/images/icons/android-chrome-192x192.png"
                                       class="my-4 d-inline-block"/>
                            </v-avatar>
                            <v-icon x-large class="rounded  white new-icon" color="yellow">{{ svgIcons.mdiNewBox }}</v-icon>
                        </div>
                        <div class="text-h6 my-8 text-center font-weight-light">An update for this app is ready, click
                            update below to get all the new features without losing your game progress
                        </div>
                        <v-btn color="black" class="white--text" @click="refreshApp">
                            Update
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>

import SudokuHelp from "@/components/SudokuHelp.vue";
import swmixin from "@/plugins/swmixin";
import SudokuLogo from "@/components/SudokuLogo.vue";
import Themer from "@/plugins/themer";

export default {
    name: 'App',
    mixins: [swmixin],
    components: {SudokuLogo, SudokuHelp},
    mounted() {
        this.$vuetify.theme.dark = this.$store.state.themeDark;
        Themer.SetThemeColor(this.$store.state.themeColor, this.$vuetify);
    },
    data: () => ({
        isHelpVisible: false,
    }),
    methods: {
        toggleTheme() {
            this.$store.commit('themeDark', !this.$store.state.themeDark);
            this.$vuetify.theme.dark = this.$store.state.themeDark;
        },
        togglePause() {
            this.$store.commit('togglePaused');
        },
        swapTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            this.$store.commit('themeDark', this.$vuetify.theme.dark);
        },
        selectThemeColor(color) {
            this.$store.commit('themeColor', color);
        },
    },
    computed: {
        colors() {
            return Themer.AvailableThemes
        },
        showCoffee() {
            return !this.$store.state.hideCoffee;
        },
    },
    watch: {
        '$store.state.themeColor':
            {
                handler(newValue) {
                    Themer.SetThemeColor(newValue, this.$vuetify);
                }
            }
    }
}
;
</script>

<!--suppress CssUnusedSymbol -->
<style>
body {
    user-select: none;
}

.new-container {
    position: relative;
    width: 128px;
    height: 128px;
}

.new-icon {
    position: absolute !important;
    right: 0;
    bottom: 0;
}

.breathe {
    animation: breathing 3s ease-out infinite normal;
}

@keyframes breathing {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 var(--v-sudoku-base)
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
}

</style>
