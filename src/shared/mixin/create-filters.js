import ReferralsObjMixin from '../mixin/referrals-obj'

export default {
    methods: {
        createFilters (loanRequest, referrals, offers, offersFunctionList, referralsFunctionList, additionalData) {
            var self = this;
            var output = {};
            
            // this function is called from multiple location and may be updating same value
            // reason for this being called from multiple location is assuption that child component will not have referrals for sub-filtering
            self.createReferralObjFromArrOfReferrals(referrals);
            
            if (offers && offers.length > 0 && typeof offersFunctionList == "object" && offersFunctionList.length > 0) {
                // loop through to have them create filter Obj
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

                    // call function to build filters
                    output = self._getFilters(loanRequest, referral, offers[i], offersFunctionList, additionalData, output);
                }

                if (referrals && referrals.length > 0 && typeof referralsFunctionList == "object" && referralsFunctionList.length > 0) {
                    // loop through referrals to have them to create filter Obj
                    for(var i=0;i<referrals.length;++i) {
                        // call function to build filters
                        var referral = self.getReferralObj(referrals[i].trusteeID);
                        output = self._getFilters(loanRequest, referral, null, referralsFunctionList, additionalData, output);
                    }
                }
                self._setFilters(output);
            }
        },
        _getFilters (loanRequest, referral, offer, functions, additionalData, obj) {
            var self = this;
            for(var j=0;j<functions.length;++j) {
                var functionName = functions[j];

                if (typeof self[functionName] == "undefined") {
                    throw new Error(functionName + " is not defined when calling on getFilters")
                    continue;
                }
                
                //ideal minimum object {text: "sometext", filterValue: string / object}
                var result = self[functionName](loanRequest, referral, offer, additionalData);
                var text = functionName;
                if (typeof obj[text] == "undefined" && typeof result != "undefined") {
                    obj[text] = {};
                }
                if (typeof obj[text] == "undefined")
                    obj[text] = {};
                
                if (result && (typeof result == "string" || typeof result == "number")) {
                    obj[text][result] = result;
                }
                else if (result && typeof result == "object" && result.text && result.filterValue) {
                    obj[text][result.text] = result.filterValue;
                }
            }
            return obj;
        },
        _setFilters (output) {
            var self = this;
            for (var filterKey in output) {
                var filterOptions = []
                for (var option in output[filterKey]) {
                    filterOptions.push({text: option, value: output[filterKey][option]})
                }
                self.$set(self.Filters, filterKey, filterOptions)
            }
        }
    },
    mixins: [ReferralsObjMixin]
}