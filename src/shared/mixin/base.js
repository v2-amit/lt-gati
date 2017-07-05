import SetupModelForFilterMixin from '../mixin/setup-model-for-filter'
import UniServiceMixin from '../mixin/uni-service'
import GroupByMixin from '../mixin/group-by'
import CreateFiltersMixin from '../mixin/create-filters'
import applyFiltersOnGroupedDataMixin from '../mixin/apply-filters-on-grouped-data'
    
export default {
    data () {
        return {
            GroupByFunctionsOnReferrals: [],
            GroupByFunctionsOnOffers: [],
            FilterByListOnReferrals: [],
            FilterByListOnOffers: [],
            FilterModels: {},
            Filters: {}
        }
    },
    methods: {
        classifyObject(obj) {
            if (obj && obj.offerAttributes) {
                return "offers"
            } else if (obj && obj.trusteeID) {
                return "referrals"
            }
        }
    },
    mixins: [SetupModelForFilterMixin, UniServiceMixin, GroupByMixin, CreateFiltersMixin, applyFiltersOnGroupedDataMixin]
}