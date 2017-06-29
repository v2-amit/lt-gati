<template>
    <div class="form-group">
        <lt-label :label="label" :tooltip-link="tooltipLink"></lt-label>
        <select
            ref="input"
            :value="value"
            :class="classValue"
            @change="updateValue($event.target.value)"
            >
            <option v-for="option in options" v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>
<script>
    import LtLabel from './lt-label.vue'
    import trackData from '../mixin/track-data'

    export default {
        props: {
            value: {
                default: 0
            },
            label: {
                type: String,
                 default: ''
            },
            options: {
                default: function () { return [] }
            },
            tooltipLink: {
            },
            classValue: {
                type: String,
                default: ''
            }
        },
        mounted () {
            this.formatValue(),
            this.setTracking()
        },
        updated () {
            this.setTracking()
        },

        methods: {
            updateValue (value) {
                this.$emit('input', value)
            },
            formatValue () {
                this.$refs.input.value = this.value;
            },
            setTracking () {
                trackData.set({key: this.label, val: this.value});
            }
        },
        components: {
            LtLabel,
            trackData
        }
    }
</script>