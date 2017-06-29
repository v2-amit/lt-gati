<!-- template for the modal component -->
<template>
    <label v-if="label" v-once>
        {{ label }} <tooltip :tooltip-link="tooltipLink" v-if="tooltipLink"></tooltip>
    </label>
</template>
<script>
    import Tooltip from './tooltip.vue'

    export default {
        props: {
            label: {
                type: String,
                default: ''
            },
            tooltipLink: {
            }
        },
        components: {
            Tooltip
        }
    }
</script>
<style scoped lang="sass">
.calc-filter {
    label {
        color: #444;
        font-weight: 400;
        display: block;

        .calc-question {
            top: 2px;
        }
    }
}
.gray-bg {
    .calc-filter label {
        color: #787878;
        font-weight: 700;
        font-size: 17.1px;
        margin-bottom: 15px;
        font-family: 'Source Sans Pro', sans-serif;
    }
}
</style>