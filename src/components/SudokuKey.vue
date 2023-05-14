<template>
    <div class="d-flex mx-2 my-1">
        <div class="btn-progress-container">
            <v-btn icon :selected="selected" x-large v-shortkey="shortcut" @shortkey="shortcutPressed">
        <v-progress-circular :class="{ 'btn-selected': selected, 'btn-complete' : isComplete }"
            :value="progress" rotate="-90"
                             :size="progressSize" width="2" :color="progressColour"
                 @click="$emit('click')">
                <v-icon v-if="icon">{{icon}}</v-icon>
                <span v-else>{{ digit }}</span>
        </v-progress-circular>
            </v-btn>
    </div>
    </div>
</template>

<script>
export default {
    name: "SudokuKey",
    props: {
        small: { type: Boolean, default: false },
        digit: {type: Number, default: -1},
        icon: {type: String, default: ''},
        selected: { type: Boolean, default: false},
        disabled: { type: Boolean, default: false},
        color: { type: String, default: 'secondary' },
        shortcut: { type: [Array, Object], default: () => []}
    },
    methods: {
        shortcutPressed() {
            this.$emit('click');
        }
    },
    computed: {
        isComplete() {
            return this.showProgress && this.countDigits >= 9;
        },
        progressSize() {
            return this.$vuetify.breakpoint.smAndDown ? 44 : 52;
        },
        showProgress() {
            return this.digit >= 0;
        },
        progressColour() {
            return this.countDigits > 9 ? 'warning' : 'light-blue';
        },
        progress() {
            if (this.digit <= 0) return 0;
            if (this.countDigits > 9) {
                return 100;
            } else {
                return (9 - this.countDigits) / 9 * 100;
            }
        },
        countDigits() {
            return this.$store.state.digitCounts[this.digit - 1];
        }
    }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

:root {
    --sudoku-key-size: 56px;
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  :root {
    --sudoku-key-size: 44px;
  }
}
</style>


<style>
:root {
    --button-size: var(--sudoku-key-size);
}

</style>
<!--suppress CssUnusedSymbol -->
<style scoped>

.v-progress-circular.btn-selected {
    background-color:  var(--v-sudoku-cell-selected-color-base);
    border-radius: 50%;
    color: var(--v-sudoku-cell-selected-text-color-base) !important;
}

.v-progress-circular.btn-selected.btn-complete {
    background-color:  var(--v-sudoku-btn-complete-selected-color-base);
    border-radius: 50%;
    color: var(--v-sudoku-cell-selected-text-color-base) !important;
}

.v-progress-circular.btn-complete {
    background-color:  var(--v-sudoku-btn-complete-color-base);
    border-radius: 50%;
    color: var(--v-sudoku-cell-selected-text-color-base) !important;
}

.v-btn {
    /*background-color: var(--v-sudoku-cell-selected-color-base);*/
}
</style>
