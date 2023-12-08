<template>
  <v-avatar :size="size" :color="color">
    <v-icon :style="style" color="white" :size="iconSize">{{ localIcon }}</v-icon>
  </v-avatar>
</template>
<script>
export default {
  name: 'sudoku-logo',
  data() {
    return {
      localIcon: null
    }
  },
  beforeMount() {
      if (this.localIcon === null) {
        this.localIcon = this.svgIcons.mdiPoundBoxOutline;
      }
  },
  props: {
    rotated: {type: Boolean, default: true},
    color: {type: String, default: 'sudoku'},
    icon: {type: String, default: null},
    size: {type: Number, default: 128}
  },
  watch: {
    icon: {
      immediate: true,
      handler(newValue) { this.localIcon = newValue;  }
    }
  },
  computed: {
    style() {
      let st = this.rotated ? 'transform: rotate(-15deg);' : '';
      // st += "margin-top: " + ((this.size - this.iconSize)/2) + 'px;'
      return st;
    },
    iconSize() {
      return this.size * 0.8;
    }
  }
}
</script>
