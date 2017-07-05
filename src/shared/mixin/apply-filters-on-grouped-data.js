
export default {
    methods: {
        applyFiltersOnGroupedData(loanRequest, additionalData, groupedOffersAndReferrals) {
            var self = this
            if (groupedOffersAndReferrals && self.FilterByListOnReferrals && self.FilterByListOnReferrals.length > 0) {
                groupedOffersAndReferrals = self.processFiltersOnGroupedData(loanRequest, additionalData, groupedOffersAndReferrals, self.FilterByListOnReferrals, "referrals")
            }
            if (groupedOffersAndReferrals && self.FilterByListOnOffers && self.FilterByListOnOffers.length > 0) {
                groupedOffersAndReferrals = self.processFiltersOnGroupedData(loanRequest, additionalData, groupedOffersAndReferrals, self.FilterByListOnOffers, "offers")
            }
            return groupedOffersAndReferrals;
        },
        processFiltersOnGroupedData(loanRequest, additionalData, groupedOffersAndReferrals, FilterByList, type) {
            var self = this
            for(var i=0;i<FilterByList.length;++i) {
                for (var groupKey in groupedOffersAndReferrals) {
                    groupedOffersAndReferrals[groupKey] = groupedOffersAndReferrals[groupKey].filter(function(row) {
                        return self.processFiltersFunctionOnRow(loanRequest, additionalData, row, FilterByList[i], type)
                    })
                }
                return groupedOffersAndReferrals;
            }
        },
        processFiltersFunctionOnRow(loanRequest, additionalData, row, functionName, type) {
            var self = this
            var result = {}
            if (self.classifyObject(row) == "offers") {
                // call filter function associated with offer
                //ideal minimum object {text: "sometext", filterValue: string / object}
                result = self[functionName](loanRequest, row.referral, row, additionalData);
            } else if (self.classifyObject(row) == "referrals") {
                // call filter function associated with referral
                //ideal minimum object {text: "sometext", filterValue: string / object}
                result = self[functionName](loanRequest, row, null, additionalData);
            } else {
                return true;
            }
            return self.compareResult(result, functionName)
        },
        compareResult(result, functionName) {
            self = this
            if (result && typeof result.filterValue != "undefined" && self.FilterModels && self.FilterModels[functionName] != null) {
                if (typeof self.FilterModels[functionName] != "object")
                    return result.filterValue == self.FilterModels[functionName]
                else if (typeof self.FilterModels[functionName] == "object" && self.FilterModels[functionName].length > 0) {
                    for (var key in self.FilterModels[functionName]) {
                        if (result.filterValue == self.FilterModels[functionName][key]) {
                            return result.filterValue == self.FilterModels[functionName][key]
                        }
                    }
                    return false
                }
            }
            return true
        }
    }
}