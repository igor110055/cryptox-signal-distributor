
function SymbolPastPriceService(SymbolInformationGlobal, MarketTypeEnum, DefinitionsIO, SymbolHelper){

    const spotSymbolInformation = SymbolInformationGlobal(MarketTypeEnum, MarketTypeEnum.Spot)
    const crossedSymbolInformation = SymbolInformationGlobal(MarketTypeEnum, MarketTypeEnum.Crossed)
    const isolatedSymbolInformation = SymbolInformationGlobal(MarketTypeEnum, MarketTypeEnum.Isolated)
    const futuresSymbolInformation = SymbolInformationGlobal(MarketTypeEnum, MarketTypeEnum.Futures)

    const pastPriceSize = DefinitionsIO.getPastPricesSize()

    spotSymbolInformation.getSymbolList().forEach(symbol => SymbolHelper(MarketTypeEnum, MarketTypeEnum.Spot, SymbolInformationGlobal, symbol).addPastPrice(pastPriceSize))
    crossedSymbolInformation.getSymbolList().forEach(symbol => SymbolHelper(MarketTypeEnum, MarketTypeEnum.Crossed, SymbolInformationGlobal, symbol).addPastPrice(pastPriceSize))
    isolatedSymbolInformation.getSymbolList().forEach(symbol => SymbolHelper(MarketTypeEnum, MarketTypeEnum.Isolated, SymbolInformationGlobal, symbol).addPastPrice(pastPriceSize))
    futuresSymbolInformation.getSymbolList().forEach(symbol => SymbolHelper(MarketTypeEnum, MarketTypeEnum.Futures, SymbolInformationGlobal, symbol).addPastPrice(pastPriceSize))
}

module.exports = SymbolPastPriceService