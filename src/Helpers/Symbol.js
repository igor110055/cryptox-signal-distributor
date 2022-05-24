
function SymbolHelper(MarketTypeEnum, marketType, SymbolInformationGlobal, symbol) {

    let symbolInfo = SymbolInformationGlobal(MarketTypeEnum, marketType).get()

    function isValidSymbol() {
        return symbolInfo.findIndex(s => s.symbol === symbol) != -1
    }

    function getBase() {
        return symbolInfo.find(s => s.symbol === symbol).base
    }

    function getQuote() {
        return symbolInfo.find(s => s.symbol === symbol).quote
    }

    function getBasePrecision() {
        return symbolInfo.find(s => s.symbol === symbol).basePrecision
    }

    function getQuotePrecision() {
        return symbolInfo.find(s => s.symbol === symbol).quotePrecision
    }

    function getTickSize() {
        return symbolInfo.find(s => s.symbol === symbol).tickSize
    }

    function getStepSize() {
        return symbolInfo.find(s => s.symbol === symbol).stepSize
    }

    function getMinNotional() {
        return symbolInfo.find(s => s.symbol === symbol).minNotional
    }

    function getSymbolQuotesByBase() {
        return symbolInfo.filter(i => i.base === getBase()).map(m => (m.quote))
    }

    function getCurrentPrice() {
        return symbolInfo.find(s => s.symbol === symbol).currentPrice
    }

    function getPastPrices() {
        return symbolInfo.find(s => s.symbol === symbol).pastPrices
    }

    function getPastPrice(position){
        return getPastPrices()[position]
    }

    function setCurrentPrice(currentPrice) {

        const index = symbolInfo.findIndex(s => s.symbol === symbol)

        if (index != -1) {
            symbolInfo[index].currentPrice = currentPrice
        }
    }

    function addPastPrice(maxPastPriceLength) {

        const index = symbolInfo.findIndex(s => s.symbol === symbol)

        if (index != -1) {

            const currentPrice = symbolInfo[index].currentPrice

            if (currentPrice != 0) {
                symbolInfo[index].pastPrices.unshift(currentPrice)

                if (symbolInfo[index].pastPrices.length > maxPastPriceLength) {
                    symbolInfo[index].pastPrices.pop()
                }
            }
        }
    }

    return {
        isValidSymbol,
        getBase,
        getQuote,
        getBasePrecision,
        getQuotePrecision,
        getTickSize,
        getStepSize,
        getMinNotional,
        getSymbolQuotesByBase,
        getCurrentPrice,
        getPastPrices,
        getPastPrice,
        setCurrentPrice,
        addPastPrice
    }
}

module.exports = SymbolHelper

