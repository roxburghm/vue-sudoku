<template>
    <div>
        <v-divider/>
    <v-list-item @click="$emit('difficulty', levelCode)">
            <v-list-item-icon>
                <v-icon large>{{  icon }}</v-icon>
            </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title class="">{{  title  }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    </div>
</template>
<script>
export default {
    name: 'SudokuRestartLevel',
    props: {
        levelCode: { type: String, required: true },
        title: { type: String, required: true },
        icon: { type: String, required: true },
    }
}
</script>
