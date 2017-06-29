export default {
    methods: {
        equalsRequestAmt (Offers) {
            var self = this;
            Offers = Offers.filter(function (item) {
                if (self.LoanRequest.amountRequested) {
                    return item.offerAttributes.loanAmount == self.LoanRequest.amountRequested
                }
            });
            return Offers;
        },
        greaterthanRequestAmt(Offers) {
            return Offers;
        },
        lessthanRequestAmt(Offers) {
            return Offers;
        }
    }
}