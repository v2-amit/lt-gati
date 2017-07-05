import ReferralsObjMixin from '../mixin/referrals-obj'

export default {
    methods: {
        groupBy (loanRequest, referrals, offers, offersFunctionList, referralsFunctionList, additionalData) {
            var self = this;
            var output = {};
            
            // this function is called from multiple location and may be updating same value
            // reason for this being called from multiple location is assuption that child component will not have referrals for sub-grouping
            self.createReferralObjFromArrOfReferrals(referrals);
            
            if (offers && offers.length > 0 && typeof offersFunctionList == "object" && offersFunctionList.length > 0) {
                // loop through offers to have them grouped by
                for(var i=0;i<offers.length;++i) {
                    // make sure we have referrals for the offer
                    var referral = self.getReferralObj(offers[i].offerAttributes.lenderID);
                    if (referral) {
                        // offer to have referral
                        offers[i].referral = referral
                    } else {
                        throw new Error(offers[i].offerAttributes.lenderID + " is missing in referrals")
                        continue;
                    }

                    // call function to build groupby
                    output = self._groupBy(loanRequest, referral, offers[i], offersFunctionList, additionalData, output);
                }
            }
            
            if (referrals && referrals.length > 0 && typeof referralsFunctionList == "object" && referralsFunctionList.length > 0) {
                // loop through referrals to have them grouped by
                for(var i=0;i<referrals.length;++i) {
                    // call function to build groupby
                    var referral = self.getReferralObj(referrals[i].trusteeID);
                    output = self._groupBy(loanRequest, referral, null, referralsFunctionList, additionalData, output);
                }
            }
            return output;
        },
       _groupBy (loanRequest, referral, offer, functions, additionalData, obj) {
            var self = this;
            for(var j=0;j<functions.length;++j) {
                var functionName = functions[j];

                if (typeof self[functionName] == "undefined") {
                    throw new Error(functionName + " is not defined when calling on groupBy")
                    continue;
                }

                var result = self[functionName](loanRequest, referral, offer, additionalData);
                var text = null, value = null
                //ideal minimum object {text: "sometext", groupByValue: string / object}
                if (typeof result == "object" && typeof result.text != "undefined" && typeof result.groupByValue != "undefined") {
                    text = result.text;
                    value = result.groupByValue;
                }

                if (typeof obj[text] == "undefined" && text != null)
                    obj[text] = [];

                if (value != null) {
                    obj[text].push(value);
                    break;
                }
            }
            return obj;
        }
    },
    mixins: [ReferralsObjMixin]
}