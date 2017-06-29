<template>
    <div class="form-group">
        <lt-label :label="label" :tooltip-link="tooltipLink"></lt-label>
        <div v-for="option in options" >
            <input type="checkbox"
                ref="input"
                :value="option.value"
                :class="classValue"
                v-model="Checkboxes"
                @click="updateValue($event.target.value)"
                />
            <label :for="option.value">
                {{ option.text }}
            </label>
        </div>
    </div>
</template>
<script>
    import LtLabel from './lt-label.vue'
    import trackData from '../mixin/track-data'

    export default {
        data () {
            return {
                Checkboxes: this.value
            }
        },
        props: {
            value: {
                default: []
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
            this.updateValue(),
            this.setTracking()
        },
        updated () {
            this.setTracking()
        },
        methods: {
            updateValue () {
                this.$emit('input', this.Checkboxes)
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