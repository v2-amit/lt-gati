
export default {
    methods: {
        getRegularAndSecuredAndShortTermAndPending(loanRequest, referral, offer, additionalData) {
            if (offer && offer.offerAttributes) {
                if (offer.offerAttributes.amortizationPeriodTimeUnitLookup === "Days" && offer.offerAttributes.amortizationPeriod <= 62 || offer.offerAttributes.amortizationPeriodTimeUnitLookup === "Months" && offer.offerAttributes.amortizationPeriod <= 2) 
                    return {text: "short term", groupByValue: offer}
                if (offer.offerAttributes.isCollateralRequired)
                    return {text: "secured", groupByValue: offer}
                else
                    return {text: "regular", groupByValue: offer}
            } else if (typeof referral.offers == "undefined") {
                //separate section for offers not extended
                if (referral.decisionStatusLookup === 12) {
                    return {text: "withdrawn referrals", groupByValue: referral}
                } else if (referral.decisionStatusLookup === 34) {
                    //lender is matched but only returned noncompliant offers
                    return {text: "noncompliant referrals", groupByValue: referral}
                } else if (referral.trusteeCategoryLookupID === 10) {
                    //if preferred lender
                    return {text: "preferred referrals", groupByValue: referral}
                } else if (referral.trusteeCategoryLookupID === 11) {
                    return {text: "secured", groupByValue: referral}
                } else {
                    return {text: "referrals without offers", groupByValue: referral}
                }
            }
        }
    }
}