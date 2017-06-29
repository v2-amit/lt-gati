import SetupModelForFilterMixin from '../mixin/setup-model-for-filter'
import UniServiceMixin from '../mixin/uni-service'
import ExpressOffersGroupbyMixin from '../mixin/group-by-and-create-filters'
import applyFiltersOnGroupedDataMixin from '../mixin/apply-filters-on-grouped-data'
    
export default {
    computed: {
        getGroupBy: function () {
            var self = this
            var modelsArr = [self.FilterModels.getReferralList]
            var groupedOffersAndReferrals = self.groupByAndCreateFilters(self.LoanRequest, self.Referrals, self.Offers, self.GroupByFunctionsOnOffers, self.GroupByFunctionsOnReferrals, [], self.FilterByListOnReferrals);
            return self.applyFiltersOnGroupedData(self.LoanRequest, {}, groupedOffersAndReferrals);
        }
    },
    data () {
        return {
            GroupByFunctionsOnReferrals: [
            ],
            GroupByFunctionsOnOffers: [
            ],
            FilterByListOnReferrals: [
            ],
            FilterByListOnOffers: [
            ],
            FilterModels: {
            },
            Filters: {
            }
        }
    },
    mixins: [SetupModelForFilterMixin, UniServiceMixin, ExpressOffersGroupbyMixin, applyFiltersOnGroupedDataMixin]
}