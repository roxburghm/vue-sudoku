<template>
    <v-row dense no-gutters>
    <v-col cols="12">
        <v-divider/>
    </v-col>
    <v-col cols="8" class="text-left align-center d-flex">
        <v-icon class="pr-4">{{ icon }}</v-icon> {{ label  }}
    </v-col>
    <v-col cols="4" class="text-right justify-end d-flex">
        <slot />
    </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'SettingItem',
    props: {
        icon: { type: String, required: true },
        label: { type: String, required: true },
    }
}
</script>
