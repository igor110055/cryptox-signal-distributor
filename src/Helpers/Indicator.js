
function IndicatorHelper(pastPrices) {

    function calculateStrengthByPastPrices(period, symbolCurrentPrice) {
        return pastPrices
            .slice(0, period)
            .reduce((a, b) => a + b, 0) / period / symbolCurrentPrice
    }

    return {
        calculateStrengthByPastPrices
    }
}

module.exports = IndicatorHelper