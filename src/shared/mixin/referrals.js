
export default {
    methods: {
        getReferralList(loanRequest, referral, offer, additionalData) {
            var retObj = {text: referral.name, filterValue: referral.trusteeID, groupByValue: referral}
            if (offer != null) {
                retObj.groupByValue = offer
            }
            return retObj;
        }
    }
}