<template>
    <v-app>
        <v-app-bar app :dark="$store.state.themeDark" light>
            <div class="d-flex align-center">
                <v-img alt="Sudoku" class="shrink mr-2" contain :src="`/images/logoFor${theme}.png`"
                       transition="scale-transition" width="40"
                />
                Sudoku

            </div>

            <v-spacer></v-spacer>

            <v-btn icon :to="{ name: 'Settings' }" large>
                <v-icon>mdi-cog</v-icon>
            </v-btn>
            <v-btn icon @click="isHelpVisible = true" large
                   v-shortkey="{q: ['?'], shiftQ: ['shift', '?'], slash: ['/']}" @shortkey="isHelpVisible = true">
                <v-icon>mdi-help-circle-outline</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>

        <v-dialog v-model="isHelpVisible" max-width="500">
            <SudokuHelp @close-dialog="isHelpVisible = false"/>
        </v-dialog>

        <v-dialog persistent :value="updateExists" :timeout="-1" color="black" outlined rounded max-width="400">
            <v-card>
                <v-card-text class="pa-8">
                    <div class="d-flex flex-column align-center">
                <v-avatar size="128" >
                        <v-img contain width="128" src="/images/icons/android-chrome-192x192.png"
                               class="my-4 d-inline-block"/>
                </v-avatar>
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

export default {
    name: 'App',
    mixins: [swmixin],
    components: {SudokuHelp},
    mounted() {
        this.$vuetify.theme.dark = this.$store.state.themeDark;
        console.log('Mounted Set theme to ', this.$store.state.themeDark)
    },
    data: () => ({
        isHelpVisible: false,
    }),
    methods: {
        swapTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            this.$store.commit('themeDark', this.$vuetify.theme.dark);
        }
    }
};
</script>

<style>
body {
    user-select: none;
}

</style>
