
function SignalFilterSubService(symbol, SymbolHelper, IndicatorHelper, MarketTypeEnum, SymbolInformationGlobal) {
    const symbolHelper = SymbolHelper(MarketTypeEnum, MarketTypeEnum.Spot, SymbolInformationGlobal, symbol)
    const indicatorHelper = IndicatorHelper(symbolHelper.getPastPrices())

    const relativeStrength5m = indicatorHelper.calculateStrengthByPastPrices(5 * 60, symbolHelper.getCurrentPrice())
    const symbolPrice10mAgo = symbolHelper.getPastPrice(10 * 60)

    const minimalRelativeForce = 0.974

    if(relativeStrength5m <= minimalRelativeForce && symbolHelper.getCurrentPrice() > symbolPrice10mAgo){
        return true
    }

    LogIO.log(`Um sinal foi interceptado ${symbol} mas não passou no filtro. minimalRelativeForce ${minimalRelativeForce} relativeStrength5m ${relativeStrength5m} symbolPrice10mAgo ${symbolPrice10mAgo} currentPrice ${symbolHelper.getCurrentPrice()}`)
    return false
}

module.exports = SignalFilterSubService