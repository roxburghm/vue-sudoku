<template>
  <div
    class="sudoku-cell d-inline-block"
    :data-cell-index="index"
    @click="toggleCellSelect"
    :class="cellTypeClass + ' ' + cellAdditionalClass"
  >
    <v-scale-transition origin="center center">
      <div class="sudoku-cell-indicator"></div>
    </v-scale-transition>
    <div class="sudoku-cell-content justify-center align-center">
      <div
        v-if="showNotes"
        class="sudoku-notes justify-center text-center d-flex fill-height align-center"
      >
        <sudoku-notes :notes="cell.notes" :key="cellNotesKey" />
      </div>
      <v-scale-transition origin="center center" v-else>
        <div class="guess" :class="`guess-${cellGuess}`" v-if="visible">
          {{ cellGuess }}
        </div>
      </v-scale-transition>
    </div>
  </div>
</template>

<script>
import SudokuNotes from "@/components/SudokuNotes.vue";

export default {
  name: "SudokuCell",
  components: { SudokuNotes },
  props: {
    index: { type: Number, required: true },
    transparentCells: { type: Array, required: true },
  },
  data() {
    return {
      visible: true,
      localTransparentCells: [],
    };
  },
  watch: {
    transparentCells: {
      immediate: true,
      handler() {
        this.localTransparentCells = [...this.transparentCells];
      },
      deep: true,
    },
    cellGuess() {
      this.visible = false;
      this.$nextTick(() => {
        this.visible = true;
      });
    },
  },
  methods: {
    toggleCellSelect() {
      if (this.cellLocked) return;

      let digit = this.selectedDigit;

      if (digit < 0) {
        if (this.canCompleteSingleNote) {
          const notes = this.cells[this.index].notes;
          digit = notes.reduce((acc, value, note) =>
            Math.max(acc, value ? note + 1 : 0)
          );
        } else {
          this.selectedCell =
            this.selectedCell === this.index ? -1 : this.index;
          return;
        }
      }

      this.$store.commit("pushGameHistory");
      this.toggleCellGuessOrNote(this.index, digit);
      this.$store.dispatch("saveGame");
    },
    containsDigit(digit) {
      if (digit) {
        return this.showNotes
          ? false
          : parseInt(this.cellGuess) === parseInt(digit);
      }
      return false;
    },
  },
  computed: {
    canCompleteSingleNote() {
      return (
        this.noteCount === 1 &&
        this.selectedCell === this.index &&
        this.$store.state.completeSingleNote &&
        !this.$store.state.isNotesMode &&
        this.cells[this.index].guess === ""
      );
    },
    isTransparent() {
      return this.localTransparentCells.includes(`${this.index}`);
    },
    cellAdditionalClass() {
      return (
        (this.showNotes ? "cell-notes" : "") +
        " " +
        (this.cellLocked ? "cell-locked" : "")
      );
    },
    cellTypeClass() {
      if (this.isTransparent) return "cell-transparent";
      if (this.cellSelected) return "cell-selected";
      // eslint-disable-next-line no-constant-condition
      if (
        this.isValidationOn &&
        this.cellGuess !== "" &&
        parseInt(this.cellGuess) !== parseInt(this.cellActual)
      )
        return "cell-incorrect";
      if (this.cellHighlighted) return "cell-highlighted";
      if (this.cellLocked) return "cell-locked";
      if (
        this.showNotes &&
        this.noteCount === 1 &&
        this.$store.state.highlightSingleNote &&
          this.selectedDigit > 0 &&
          this.cells[this.index].notes[this.selectedDigit - 1]
      ) {
        return "cell-single-note";
      }
      return "";
    },
    hasIndicator() {
      return this.cellSelected || this.cellLocked || this.cellHighlighted;
    },
    cellSelected() {
      return this.selectedCell === this.index;
    },
    cell() {
      return this.cells[this.index];
    },
    cellGuess() {
      return this.cell.guess;
    },
    cellLocked() {
      return this.cell.locked;
    },
    cellHighlighted() {
      if (this.selectedDigit >= 0) {
        return this.containsDigit(this.selectedDigit);
      } else if (this.selectedCell >= 0) {
        return this.containsDigit(this.cells[this.selectedCell].guess);
      }
      return false;
    },
    cellActual() {
      return this.cell.actual;
    },
    noteCount() {
      return this.cell.notes.reduce((acc, note) => acc + (note ? 1 : 0), 0);
    },
    hasNotes() {
      return this.cell.notes.reduce((acc, note) => acc || note, false);
    },
    showNotes() {
      return (
        this.cellGuess === "" &&
        (this.hasNotes ||
          (this.isNotesMode && this.selectedCell === this.index))
      );
    },
    cellNotesKey() {
      return "cnk-" + this.cell.notes.join("");
    },
  },
};
</script>

<!--suppress CssUnusedSymbol -->
<style scoped lang="scss">
.sudoku-cell {
  background-color: var(--v-sudoku-cell-base);
  width: var(--sudoku-cell-size);
  height: var(--sudoku-cell-size);
  overflow: hidden;
  margin: 0;
  padding: 5px;
  text-align: center;
  position: relative;
}

.sudoku-cell.cell-transparent {
  opacity: 0.3;
  border: 2px dotted grey;
  background-color: var(--v-primary-lighten2);
}

.sudoku-cell.cell-locked {
  background-color: var(--v-sudoku-cell-color-darken1);
}

.sudoku-cell.cell-locked .sudoku-cell-indicator {
  background-color: var(--v-sudoku-cell-color-darken1);
}

.sudoku-cell.cell-selected {
  color: var(--v-sudoku-cell-color-base);
}

.sudoku-cell.cell-selected .sudoku-cell-indicator {
  background-color: var(--v-sudoku-base);
}

.sudoku-cell.cell-incorrect .sudoku-cell-indicator {
  background-color: var(--v-warning-base);
}

.sudoku-cell.cell-locked {
  color: var(--v-sudoku-cell-text-color-base);
}

.sudoku-cell.cell-incorrect {
  color: var(--v-sudoku-cell-color-base);
}

.sudoku-cell.cell-highlighted .sudoku-cell-indicator {
  border: 2px solid var(--v-sudoku-base);
}

.sudoku-cell.cell-highlighted {
  color: var(--v-sudoku-base);
}

.sudoku-cell {
  background-color: var(--v-sudoku-cell-color-base);
}

.cell-notes .sudoku-cell-indicator {
  border-radius: 10%;
}

.cell-single-note .sudoku-notes {
  background-color: var(--v-sudoku-lighten4);
}

.sudoku-cell .sudoku-notes {
  font-weight: 600;
  font-size: calc(var(--sudoku-cell-size) * 0.2);
  line-height: calc(var(--sudoku-cell-size) * 0.2);
  font-variant-numeric: tabular-nums lining-nums;
}

.sudoku-cell-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.sudoku-cell-indicator {
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border-radius: 50%;
  background-color: transparent;
}

.sudoku-cell .guess {
  margin: auto;
  font-variant-numeric: tabular-nums lining-nums;
  font-size: calc(var(--sudoku-cell-size) * 0.7);
  line-height: var(--sudoku-cell-size);
}

.sudoku-cell .guess.guess-4,
.sudoku-cell .guess.guess-5 {
  margin-left: -2px;
}

.theme--dark {
  .sudoku-cell.cell-transparent {
    background-color: var(--v-primary-darken2);
  }

  .sudoku-cell.cell-locked {
    background-color: var(--v-sudoku-cell-color-lighten2);
  }

  .sudoku-cell.cell-locked .sudoku-cell-indicator {
    background-color: var(--v-sudoku-cell-color-lighten2);
  }

  .cell-single-note .sudoku-notes {
    background-color: var(--v-sudoku-darken4);
  }
}
</style>
