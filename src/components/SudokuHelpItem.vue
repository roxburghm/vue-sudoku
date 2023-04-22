<template>
    <tr>
        <td>
            <v-icon>{{icon}}</v-icon>
        </td>
        <td><div class="text-h6 mt-2">{{title}}</div><p class="grey--text caption">{{text}}</p></td>
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
