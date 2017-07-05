// service
import UniService from '../services/uni'
import CommonMethodsMixin from '../mixin/common-methods'
import ReferralsObjMixin from '../mixin/referrals-obj'

export default {
    props: {
        qfuid: {
            default: null
        }
    },
    data () {
        return {
            QfUid: null,
            LoanRequest: {},
            Referrals: [],
            Offers: [],
        }
    },
    watch: {
        // whenever qfid changes, this function will run
        QfUid: function (newQfUid) {
          this.getLoanRequestData()
          this.getReferrals()
          this.getOffers()
        }
    },
    mounted: function () {
        this.QfUid = this.qfuid
    },
    methods: {
        getLoanRequestData () {
            this.LoanRequest = {}
            return UniService.getResponse("getloanrequestdata", this.updateLoanRequestData, this.qfuid);
        },
        getReferrals () {
            this.Referrals = {}
            return UniService.getResponse("getreferrals", this.updateReferralsData, this.qfuid);
        },
        getOffers () {
            this.Offers = []
            return UniService.getResponse("getoffers", this.updateOffersData, this.qfuid);
        },
        updateLoanRequestData(data) {
            this.LoanRequest = data;
        },
        updateReferralsData(data) {
            this.Referrals = data;
            
            // this function is called from multiple location and may be updating same value
            // reason for this being called from multiple location is assuption that child component will not have referrals for sub-grouping
            this.createReferralObjFromArrOfReferrals(this.Referrals);
        },
        updateOffersData(data) {
            self = this;
            if (data && typeof data.map == "function") {
                data.map(function(offer) {
                    if (offer.offerAttributes.amortizationPeriodTimeUnitLookup == "Years") {
                        offer.offerAttributes.amortizationPeriodInYears = offer.offerAttributes.amortizationPeriod;
                        offer.offerAttributes.amortizationPeriodInMonths = offer.offerAttributes.amortizationPeriod * 12;
                    } else if (offer.offerAttributes.amortizationPeriodTimeUnitLookup == "Months") {
                        offer.offerAttributes.amortizationPeriodInYears = offer.offerAttributes.amortizationPeriod / 12;
                        offer.offerAttributes.amortizationPeriodInMonths = offer.offerAttributes.amortizationPeriod;
                    }
                    offer.totalFees = self.getTotalFees(offer)
                })
            }
            this.Offers = data;
        }
    },
    mixins: [CommonMethodsMixin, ReferralsObjMixin]
}