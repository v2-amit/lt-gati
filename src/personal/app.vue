<template>
<div>
  <personal-offers :qfuid="qfuid"></personal-offers>


</div>
</template>

<script>
  import PersonalOffers from '../shared/components/personal-offers.vue'
    export default {
        props: {
          qfuid: {
            default: null
          }
        },
        components: {PersonalOffers}
    }
</script>