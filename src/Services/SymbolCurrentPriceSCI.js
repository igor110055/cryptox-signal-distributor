
function SymbolCurrentPriceSCIService(tickers, SymbolInformationGlobal, MarketTypeEnum, SymbolHelper) {

    tickers.forEach(t => {
        const spotSymbolHelper = SymbolHelper(MarketTypeEnum, MarketTypeEnum.Spot, SymbolInformationGlobal, t.symbol)
        const crossedSymbolHelper = SymbolHelper(MarketTypeEnum, MarketTypeEnum.Crossed, SymbolInformationGlobal, t.symbol)
        const isolatedSymbolHelper = SymbolHelper(MarketTypeEnum, MarketTypeEnum.Isolated, SymbolInformationGlobal, t.symbol)

        spotSymbolHelper.setCurrentPrice(parseFloat(t.curDayClose))
        crossedSymbolHelper.setCurrentPrice(parseFloat(t.curDayClose))
        isolatedSymbolHelper.setCurrentPrice(parseFloat(t.curDayClose))
    })
}

module.exports = SymbolCurrentPriceSCIService