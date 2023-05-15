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
                neutral: '#888',

                sudoku: '#4dc2f8',
                // sudoku: '#e36d0e',
                'sudoku-cell-color': '#fff',
            },


            dark: {
                neutral: '#555',

                sudoku: '#b0789a',
                'sudoku-cell-color': '#222',
            }
        },
    },
});
