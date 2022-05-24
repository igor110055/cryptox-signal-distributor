
async function SymbolInformationService(axios, MarketTypeEnum, SymbolInformationGlobal, DefinitionsIO) {

    const spotInfo = (await axios.get('https://api.binance.com/api/v1/exchangeInfo')).data.symbols    
    const crossSymbolsInfo = (await axios.get('https://www.binance.com/bapi/margin/v1/friendly/margin/symbols')).data.data
    const isolatedInfo = (await axios.get('https://www.binance.com/bapi/margin/v1/friendly/isolated-margin/pair/vip-level')).data.data
    const futuresInfo = (await axios.get('https://www.binance.com/fapi/v1/exchangeInfo')).data.symbols

    const spotSymbolInformation = SymbolInformationGlobal(MarketTypeEnum, MarketTypeEnum.Spot)
    const crossedSymbolInformation = SymbolInformationGlobal(MarketTypeEnum, MarketTypeEnum.Crossed)
    const isolatedSymbolInformation = SymbolInformationGlobal(MarketTypeEnum, MarketTypeEnum.Isolated)
    const futuresSymbolInformation = SymbolInformationGlobal(MarketTypeEnum, MarketTypeEnum.Futures)

    spotSymbolInformation.set(spotInfo
        .filter(s => s.status === 'TRADING' && DefinitionsIO.getOperationalAssets().includes(s.quoteAsset))
        .map(s => ({
            symbol: s.symbol,
            base: s.baseAsset,
            quote: s.quoteAsset,
            currentPrice: 0,
            pastPrices: []
        })))

    crossedSymbolInformation.set(spotSymbolInformation.get()
        .filter(s => crossSymbolsInfo.map(c => c.base + c.quote).includes(s.symbol))
        .map(s => ({
            symbol: s.symbol,
            base: s.baseAsset,
            quote: s.quoteAsset,
            currentPrice: 0,
            pastPrices: []
        })))
    
    isolatedSymbolInformation.set(spotSymbolInformation.get()
        .filter(s => isolatedInfo.map(i => i.base.assetName + i.quote.assetName).includes(s.symbol))
        .map(s => ({
            symbol: s.symbol,
            base: s.baseAsset,
            quote: s.quoteAsset,
            currentPrice: 0,
            pastPrices: []
        })))

    futuresSymbolInformation.set(futuresInfo
        .filter(s => s.status === 'TRADING' && DefinitionsIO.getOperationalAssets().includes(s.quoteAsset))
        .map(s => ({
            symbol: s.symbol,
            base: s.baseAsset,
            quote: s.quoteAsset,
            currentPrice: 0,
            pastPrices: []
        })))
}

module.exports = SymbolInformationService
