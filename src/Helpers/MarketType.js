
function MarketTypeHelper(MarketTypeEnum, SymbolInformationGlobal){

    function getSymbolMarkets(symbol){

        const markets = []

        for(let [key, value] of Object.entries(MarketTypeEnum)){
            const symbolInformation = SymbolInformationGlobal(MarketTypeEnum, value)

            if(symbolInformation.symbolExists(symbol)){
                markets.push(value)
            }            
        }

        return markets
    }

    function getMarketPreference(markets){
        if(markets.includes(MarketTypeEnum.Futures)){
            return MarketTypeEnum.Futures
        }

        if(markets.includes(MarketTypeEnum.Crossed)){
            return MarketTypeEnum.Crossed
        }

        if(markets.includes(MarketTypeEnum.Isolated)){
            return MarketTypeEnum.Isolated
        }

        throw new Error('MarketTypeHelper::getMarketPreferece market doenst exists')
    }

    return {
        getSymbolMarkets,
        getMarketPreference
    }
}

module.exports = MarketTypeHelper