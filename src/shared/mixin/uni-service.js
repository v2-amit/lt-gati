// service
import UniService from '../services/uni'
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
            Referrals: {},
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
        getLoanRequestData: function () {
            this.LoanRequest = {}
            return UniService.getResponse("getloanrequestdata", this.updateLoanRequestData, this.qfuid);
        },
        getReferrals: function () {
            this.Referrals = {}
            return UniService.getResponse("getreferrals", this.updateReferralsData, this.qfuid);
        },
        getOffers: function () {
            this.Offers = []
            return UniService.getResponse("getoffers", this.updateOffersData, this.qfuid);
        },
        updateLoanRequestData(data) {
            this.LoanRequest = data;
        },
        updateReferralsData(data) {
            this.Referrals = data;
        },
        updateOffersData(data) {
            if (data && typeof data.map == "function") {
                data.map(function(offer){
                    if (offer.offerAttributes.amortizationPeriodTimeUnitLookup == "Years") {
                        offer.offerAttributes.amortizationPeriodInYears = offer.offerAttributes.amortizationPeriod;
                        offer.offerAttributes.amortizationPeriodInMonths = offer.offerAttributes.amortizationPeriod * 12;
                    } else if (offer.offerAttributes.amortizationPeriodTimeUnitLookup == "Months") {
                        offer.offerAttributes.amortizationPeriodInYears = offer.offerAttributes.amortizationPeriod / 12;
                        offer.offerAttributes.amortizationPeriodInMonths = offer.offerAttributes.amortizationPeriod;
                    }
                })
            }
            this.Offers = data;
        }
    }
}