<template>
    <v-avatar :size="size" color="sudoku">
        <v-icon style="transform: rotate(-15deg)" color="white" :size="iconSize">{{ icon }}</v-icon>
    </v-avatar>
</template>
<script>
export default {
    name: 'sudoku-logo',
    props: {
        icon: { type: String, default: 'mdi-pound-box-outline' },
        size: { type: Number, default: 128 }
    },
    computed: {
        iconSize() {
            return this.size * 0.8;
        }
    }
}
</script>
