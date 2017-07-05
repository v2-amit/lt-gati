
export default {
    methods: {
        getTotalFees (offer) {
            var fees = 0;
            fees += offer.offerAttributes.originationFee || 0;
            fees += offer.offerAttributes.lenderFees || 0;
            fees += ((offer.offerAttributes.discountPoints / 100) * offer.offerAttributes.loanAmount) || 0;
            return fees;
        }
    }
}