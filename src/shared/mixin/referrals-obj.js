
export default {
    data () {
        return {
            ReferralsObj: {},
        }
    },
    methods: {
        createReferralObjFromArrOfReferrals (referrals) { // this method helps in simplicty of look-up
            var self = this;
            if (referrals && referrals.length > 0) {
                // loop through referrals to build referralsObj
                for(var i=0;i<referrals.length;++i) {
                    // local object
                    self.ReferralsObj[referrals[i].trusteeID] = referrals[i];
                }
            }
        },
        getReferralObj (TrusteeIdOrLenderID) {
            var self = this;
            return self.ReferralsObj[TrusteeIdOrLenderID]
        }
    }
}