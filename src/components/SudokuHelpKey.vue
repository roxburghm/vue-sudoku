<template>
    <tr>
        <td>
            {{ keyCode }}
        </td>
        <td>
            {{ action }}
        </td>
    </tr>
</template>
<script>
export default {
    name: 'SudokuHelpItem',
    props: {
        keyCode: {type: String, required: true},
        action: {type: String, required: true},
    }
}
</script>
