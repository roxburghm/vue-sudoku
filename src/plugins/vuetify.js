import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: '#aaa',
                secondary: '#c8e2ee',
                black: '#333333',
                sudoku: '#4dc2f8',
                'sudoku-progress-high-score': '#20a8e7',
                'sudoku-progress': '#333',
                'sudoku-cell-selected-color': '#20a8e7',
                'sudoku-cell-selected-text-color': '#fff',
                'sudoku-cell-highlighted-color': '#888',
                'sudoku-cell-highlighted-text-color': '#888',
                'sudoku-cell-incorrect-color': '#d22',
                'sudoku-cell-incorrect-text-color': '#fff',
                'sudoku-btn-complete-selected-color': '#ccc',
                'sudoku-btn-complete-color': '#eee',
                'sudoku-cell-locked-color': '#eee',
                'sudoku-cell-locked-text-color': '#aaa',
                'sudoku-cell-text-color': '#aaa',
                'sudoku-cell-color': '#fff',
                'sudoku-cell-single-note-color': '#fdfde8'
            },
            dark: {
                primary: '#666',
                secondary: '#85969d',
                black: '#ffffff',
                sudoku: '#4dc2f8',
                'sudoku-progress-high-score': '#20a8e7',
                'sudoku-progress': '#ddd',
                'sudoku-cell-selected-color': '#20a8e7',
                'sudoku-cell-selected-text-color': '#000',

                'sudoku-cell-highlighted-color': '#888',
                'sudoku-cell-highlighted-text-color': '#888',

                'sudoku-cell-incorrect-color': '#d22',
                'sudoku-cell-incorrect-text-color': '#fff',

                'sudoku-btn-complete-color': '#eee',
                'sudoku-btn-complete-selected-color': '#ccc',

                'sudoku-cell-locked-color': '#666',
                'sudoku-cell-locked-text-color': '#aaa',

                'sudoku-cell-color': '#333',
                'sudoku-cell-text-color': '#aaa',
                'sudoku-cell-single-note-color': '#65654c'
            }
        },
    },
});
