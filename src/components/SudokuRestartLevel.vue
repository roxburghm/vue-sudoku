<template>
    <div>
        <v-divider/>
    <v-btn block outlined class="mb-6 py-5" @click="$emit('difficulty', levelCode)">
        <div class="star-container">
                <v-icon color="sudoku" large :key="cnt" v-for="cnt in starCount">{{ svgIcons.mdiStarOutline }}</v-icon>
        </div>
        <span class="title-container">{{  title  }}</span>
    </v-btn>
    </div>
</template>
<script>
import {SudokuLevels} from "@/plugins/sudoku";

export default {
    name: 'SudokuRestartLevel',
    props: {
        levelCode: { type: String, required: true },
        title: { type: String, required: true },
    },
    computed: {
        starCount() {
            switch (this.levelCode) {
                case SudokuLevels.EASY:
                    return 1;
                    case SudokuLevels.MEDIUM:
                    return 2;
                    case SudokuLevels.HARD:
                    return 3;

                default:
                    return 1;
            }
        }
    }
}
</script>
<style scoped>
.title-container {
    width: 120px;
    text-align: left;
    padding-left: 16px;
}
.star-container {
    width: 120px;
    text-align: center;
    justify-content: center;
}
</style>
