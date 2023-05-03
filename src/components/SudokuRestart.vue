<template>
    <v-card>
        <v-card-title class="headline justify-center">{{ title }}</v-card-title>
        <v-card-text>
            <slot></slot>
            <v-list>
                <SudokuRestartLevel @difficulty="levelSelect" :level-code="SudokuLevels.EASY" icon="mdi-emoticon-happy-outline" title="Easiest"/>
                <SudokuRestartLevel @difficulty="levelSelect" :level-code="SudokuLevels.MEDIUM" icon="mdi-emoticon-neutral-outline" title="Medium"/>
                <SudokuRestartLevel @difficulty="levelSelect" :level-code="SudokuLevels.HARD" icon="mdi-emoticon-sad-outline" title="Hard"/>
                <SudokuRestartLevel @difficulty="levelSelect" :level-code="SudokuLevels.EMPTY" icon="mdi-arrow-left" title="Resume current game" v-if="cancellable"/>
            </v-list>
        </v-card-text>
    </v-card>
</template>
<script>
import {SudokuLevels} from "@/plugins/sudoku";
import SudokuRestartLevel from "@/components/SudokuRestartLevel.vue";

export default {
    name: 'SudokuRestart',
    components: {SudokuRestartLevel},
    props: {
        title: {
            type: String,
            default: 'Restart'
        },
        cancellable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        levelSelect(level) {
            if (level !== SudokuLevels.EMPTY) {
                this.$emit('difficulty', level)
            }
            this.$emit('close-dialog')
        }
    },
    computed: {
        SudokuLevels() {
            return SudokuLevels
        }
    }
}
</script>
