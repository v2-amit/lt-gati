
export default {
    methods: {
        groupByAndCreateFilters (loanRequest, referrals, offers, arrayGroupByFunctionsOnOffers, arrayGroupByFunctionsOnReferrals, arrayFilterListFunctionsOnOffers, arrayFilterListFunctionsOnReferrals, additionalData) {
            var self = this;
            var groupByObj = {}, filterByObj = {};
            var referralsObj = {}
            
            // loop through referrals to build referralsObj
            for(var i=0;i<referrals.length;++i) {
                // local object
                referralsObj[referrals[i].trusteeID] = referrals[i];
            }
            
            // loop through to have them grouped by, and then to create filter Obj
            for(var i=0;i<offers.length;++i) {
                
                // make sure we have referrals for the offer
                if (referralsObj[offers[i].offerAttributes.lenderID]) {
                    // offer to have referral
                    offers[i].referral = referralsObj[offers[i].offerAttributes.lenderID]
                } else {
                    throw new Error(offers[i].offerAttributes.lenderID + " is missing in referrals")
                    continue;
                }
                
                // call function to build groupby
                if (typeof arrayGroupByFunctionsOnOffers == "object" && arrayGroupByFunctionsOnOffers.length > 0)
                    groupByObj = self.groupBy(loanRequest, referralsObj[offers[i].offerAttributes.lenderID], offers[i], arrayGroupByFunctionsOnOffers, additionalData, groupByObj);
                    
                // call function to build filters
                if (typeof arrayFilterListFunctionsOnOffers != "undefined" && arrayFilterListFunctionsOnOffers.length > 0) {
                    filterByObj = self.getFilters(loanRequest, referralsObj[offers[i].offerAttributes.lenderID], offers[i], arrayFilterListFunctionsOnOffers, additionalData, filterByObj);
                }
                
                // push offerID
                if (typeof (referralsObj[offers[i].offerAttributes.lenderID].offers) == "undefined")
                    referralsObj[offers[i].offerAttributes.lenderID].offers = []
                
                referralsObj[offers[i].offerAttributes.lenderID].offers.push(offers[i]);
            }
            
            // loop through referrals to have them grouped by, and then to create filter Obj
            for(var i=0;i<referrals.length;++i) {    
                // call function to build groupby
                if (typeof arrayGroupByFunctionsOnReferrals == "object" && arrayGroupByFunctionsOnReferrals.length > 0)
                    groupByObj = self.groupBy(loanRequest, referralsObj[referrals[i].trusteeID], null, arrayGroupByFunctionsOnReferrals, additionalData, groupByObj);
                    
                // call function to build filters
                if (typeof arrayFilterListFunctionsOnReferrals != "undefined" && arrayFilterListFunctionsOnReferrals.length > 0) {
                    filterByObj = self.getFilters(loanRequest, referralsObj[referrals[i].trusteeID], null, arrayFilterListFunctionsOnReferrals, additionalData, filterByObj);
                }
            }
            
            this.setFilters(filterByObj);
            
            return groupByObj;
        },
        groupBy (loanRequest, referral, offer, functions, additionalData, obj) {
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
        },
        getFilters (loanRequest, referral, offer, functions, additionalData, obj) {
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
        setFilters (filterByObj) {
            var self = this;
            for (var filterKey in filterByObj) {
                var filterOptions = []
                for (var option in filterByObj[filterKey]) {
                    filterOptions.push({text: option, value: filterByObj[filterKey][option]})
                }
                self.$set(self.Filters, filterKey, filterOptions)
            }
        }
    }
}