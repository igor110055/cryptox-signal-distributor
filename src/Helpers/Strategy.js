
function StrategyHelper(StrategyEnum, MarketTypeEnum, StrategiesIO){    

    const strategyJson = StrategiesIO.getStrategies()

    function getParamsByStrategyAndMarket(strategy, market) {

        if (strategy === StrategyEnum.Conservative) {
            if(market === MarketTypeEnum.Futures){
                return strategyJson.Conservative.Futures
            }
            else{
                return strategyJson.Conservative.Spot
            }
        }

        else if (strategy === StrategyEnum.Moderate) {
            if(market === MarketTypeEnum.Futures){
                return strategyJson.Moderate.Futures
            }
            else{
                return strategyJson.Moderate.Spot
            }
        }

        else if (strategy === StrategyEnum.Agressive) {
            if(market === MarketTypeEnum.Futures){
                return strategyJson.Agressive.Futures
            }
            else{
                return strategyJson.Agressive.Spot
            }
        }

        throw new Error(`StrategyHelper::getStategy strategy doesnt exists (${strategy})`)
    }

    return {
        getParamsByStrategyAndMarket
    }
}

module.exports = StrategyHelper