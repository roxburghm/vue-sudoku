<template>
    <v-app>
        <v-app-bar app color="white" light>
            <div class="d-flex align-center">
                <v-img alt="Sudoku" class="shrink mr-2" contain src="/images/icons/android-chrome-192x192.png"
                       transition="scale-transition" width="40"
                />
                Sudoku

            </div>

            <v-spacer></v-spacer>

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
            <v-img contain width="128" src="/images/icons/android-chrome-192x192.png" class="my-4 d-inline-block"/>
                <div class="text-h6 mb-4">An update to this app is available</div>
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

    data: () => ({
        isHelpVisible: false,
    }),
};
</script>