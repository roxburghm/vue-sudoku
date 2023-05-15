<template>
    <v-avatar :size="size" :color="color">
        <v-icon :style="style" color="white" :size="iconSize">{{ icon }}</v-icon>
    </v-avatar>
</template>
<script>
export default {
    name: 'sudoku-logo',
    props: {
        rotated: { type: Boolean, default: true },
        color: { type: String, default: 'sudoku' },
        icon: { type: String, default: 'mdi-pound-box-outline' },
        size: { type: Number, default: 128 }
    },
    computed: {
        style() {
            return this.rotated ? 'transform: rotate(-15deg)' : '';
        },
        iconSize() {
            return this.size * 0.8;
        }
    }
}
</script>
