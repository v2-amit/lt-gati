<template>
    <div>
        <checkbox
            v-model="FilterModels.getReferralList" 
            :options="Filters.getReferralList"
            :value="FilterModels.getReferralList"
            >
        </checkbox>
        <div v-for="(listKey, k) in CustomOrder">
            <hr/>
            <div v-if="getGroupBy && getGroupBy[listKey] && getGroupBy[listKey].length">
                <div>{{getGroupBy[listKey].length}} {{listKey}}</div>
                <hr/>
                <offer-row :list="getGroupBy[listKey]"></offer-row>
            </div>
        </div>
        <hr/><hr/>
    </div>
</template>
<script>
    import BaseMixin from '../mixin/base'
    import OfferTypeMixin from '../mixin/offer-type'
    import ReferralsMixin from '../mixin/referrals'
    import DropDown from '../components/drop-down.vue'
    import Checkbox from '../components/checkbox.vue'
    import OfferRow from '../components/offer-row.vue'
    
    export default {
        data () {
            return {
                GroupByFunctionsOnReferrals: [
                    "getRegularAndSecuredAndShortTermAndPending"
                ],
                GroupByFunctionsOnOffers: [
                    "getRegularAndSecuredAndShortTermAndPending"
                ],
                FilterByListOnReferrals: [
                    "getReferralList"
                ],
                FilterByListOnOffers: [
                    "getReferralList"
                ],
                FilterModels: {
                    getReferralList: []
                },
                Filters: {
                },
                CustomOrder: ["regular", "short term", "secured", "referrals without offers"]
            }
        },
        components: {
            DropDown,
            Checkbox,
            OfferRow
        },
        mixins: [BaseMixin, OfferTypeMixin, ReferralsMixin]
    }
</script>