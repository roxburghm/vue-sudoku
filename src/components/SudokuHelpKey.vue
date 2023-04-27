<template>
    <tr>
        <td class="text-no-wrap">
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
