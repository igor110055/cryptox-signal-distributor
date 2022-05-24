
function SymbolCurrentPriceFuturesService(tickers, SymbolInformationGlobal, MarketTypeEnum, SymbolHelper) {

    tickers.forEach(t => {

        const symbolHelper = SymbolHelper(MarketTypeEnum, MarketTypeEnum.Futures, SymbolInformationGlobal, t.symbol)

        if(symbolHelper.isValidSymbol()){
            symbolHelper.setCurrentPrice(parseFloat(t.curDayClose))
        }
    })
}

module.exports = SymbolCurrentPriceFuturesService