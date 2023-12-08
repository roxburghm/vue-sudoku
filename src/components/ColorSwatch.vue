<template>
        <v-avatar @click="$emit('click')" :style="avatarStyle" size="32">
            <div class="holder" :class="{selected: isSelected}">
            </div>
        </v-avatar>
</template>
<script>
import Themer from "@/plugins/themer";

export default {
    name: 'color-swatch',
    props: {
        color: { type: String, required: true}
    },
    computed: {
        isSelected() {
            return this.color === this.$store.state.themeColor;
        },
        avatarStyle() {
            let colorValue = Themer.GetBaseColor(this.color);
            return `background-color: ${colorValue};`
        }
    }
}
</script>

<style scoped>
.holder {
    width: 24px;
    height: 24px;
    border: 4px dotted transparent;
    border-radius: 50%;
}

.holder.selected {
    border-color: #fff !important;
}

</style>
