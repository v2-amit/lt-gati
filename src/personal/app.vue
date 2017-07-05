<template>
<div>
    <redirect-messages :message-key="redirectMessage" v-if="redirectMessage" v-once></redirect-messages>
    <personal-offers :qfuid="qfuid"></personal-offers>
</div>
</template>

<script>
  import PersonalOffers from '../shared/components/personal-offers.vue'
  import RedirectMessages from '../shared/components/redirect-messages.vue'
    export default {
        props: {
          qfuid: {
            default: null
          },
          redirectMessage: {
              default: "success"
          }
        },
        components: {PersonalOffers, RedirectMessages}
    }
</script>