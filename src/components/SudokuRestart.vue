<template>
    <v-card elevation="0">
        <v-card-title class="headline justify-center">
          <div class="d-block">
            <div><sudoku-logo :size="128" class="my-8"/></div>
            <div class="text-center">{{ title }}</div>
      </div>
        </v-card-title>
        <v-card-text class="text-center">
            <slot></slot>
            <v-list>
                <SudokuRestartLevel @difficulty="levelSelect" :level-code="SudokuLevels.EASY"  title="EASY LEVEL"/>
                <SudokuRestartLevel @difficulty="levelSelect" :level-code="SudokuLevels.MEDIUM"  title="MEDIUM LEVEL"/>
                <SudokuRestartLevel @difficulty="levelSelect" :level-code="SudokuLevels.HARD"  title="HARD LEVEL"/>
                <v-divider/>
            </v-list>
            <div class="text-center mt-5">
                <v-btn block outlined @click="cancelAction" v-if="cancellable">{{ cancel }}</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>
<script>
import {SudokuLevels} from "@/plugins/sudoku";
import SudokuRestartLevel from "@/components/SudokuRestartLevel.vue";
import SudokuLogo from "@/components/SudokuLogo.vue";

export default {
    name: 'SudokuRestart',
    components: {SudokuLogo, SudokuRestartLevel},
    props: {
        title: {
            type: String,
            default: 'Restart',
        },
        cancel: {
            type: String,
            default: 'Cancel',
        },
        cancellable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        cancelAction() {
            this.$emit('close-dialog')
        },
        levelSelect(level) {
            this.$emit('difficulty', level)
        }
    },
    computed: {
        SudokuLevels() {
            return SudokuLevels
        }
    }
}
</script>
