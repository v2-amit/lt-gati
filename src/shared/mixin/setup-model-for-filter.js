
export default {
    beforeMount: function () {
        if (this.FilterByListOnReferrals)
            this.setupModelForFilters(this.FilterByListOnReferrals)
        
        if (this.FilterByListOnOffers)
            this.setupModelForFilters(this.FilterByListOnOffers)
    },
    methods: {
        setupModelForFilters (filterFunctionList) {
            var self = this
            filterFunctionList = filterFunctionList || []
            for(var i=0;i<filterFunctionList.length;++i) {
                var key = filterFunctionList[i]
                if (typeof self.FilterModels[key] == "undefined")
                    self.$set(self.FilterModels, key, "")
            }
        }
    }
}