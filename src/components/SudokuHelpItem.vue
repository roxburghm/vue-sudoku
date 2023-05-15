<template>
    <tr>
        <td>
            <v-icon color="sudoku">{{icon}}</v-icon>
        </td>
        <td><div class="text-h6 mt-1 font-weight-light">{{title}}</div><p class="grey--text caption mb-1">{{text}}</p></td>
    </tr>
</template>
<script>
export default {
    name: 'SudokuHelpItem',
    props: {
        icon: {type: String, required: true},
        text: {type: String, required: true},
        title: {type: String, required: true}
    }
}
</script>
