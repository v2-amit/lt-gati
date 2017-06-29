<template>
<div>
    <li v-for="(listObj, key) in list">
        <span v-if="listObj.offerAttributes">{{listObj.referral.name}} => {{listObj.offerAttributes.monthlyPayment || listObj.offerAttributes.repaymentAmount}}</span>
        <span v-else="listObj.name">{{listObj.name}} => </span>
    </li>
</div>
</template>
<script>
export default {
    props: {
        list: {
            default: function () {
                return [
                ];
            }
        }
    }
}
</script>