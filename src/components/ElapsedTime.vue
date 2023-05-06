<template>
    <div><span v-if="hours">{{ hours}}<span v-if="hours" class="unit mr-1">h</span></span>{{ mins }}<span class="unit mr-1">m</span>{{ secs }}<span class="unit">s</span></div>
</template>

<script>
export default {
    name: "ElapsedTime",
    props: {
        seconds: {type: [Number, String], required: true}
    },
    computed: {
        hours() {
            return Math.floor(this.seconds / 3600);
        },
        mins() {
            let mins = (Math.floor(this.seconds / 60) % 60);

            if (this.hours) {
                return mins.toString().padStart(2, '0');
            }
            return mins;

        },
        secs() { return (this.seconds % 60).toString().padStart(2, '0') },
    }
}
</script>

<style scoped>
.unit {
    font-weight: bold;
    font-size: 0.7em;
}
</style>