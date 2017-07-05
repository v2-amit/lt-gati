<template>
    <div v-if="messageKey && show">
        {{RedirectMessage}}
        <button @click="show=false">Hide</button>
    </div>
</template>
<script>
    import { RedirectMessages } from "../constants/redirect-messages"

    export default {
        props: {
            messageKey: {
                default: null
            }
        },
        data () {
            return {
                RedirectMessage: RedirectMessages[this.messageKey],
                show: true
            }
        },
        methods: {
        },
        created: function () {
            
        }
    }
</script>