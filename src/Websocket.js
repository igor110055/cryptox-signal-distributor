
const Websocket = {

    registerSpotMessageReceiveService(SpotMessageReceiveService, binanceApi, axios,
        SignalFilterSubService, SignalDistributeSubService,
        SymbolHelper, IndicatorHelper, MarketTypeHelper, RequestHelper, StrategyHelper,
        SymbolInformationGlobal,
        MarketTypeEnum, StrategyEnum,
        DefinitionsIO, LogIO, AccountsIO, StrategiesIO) {

        binanceApi.ws.user(message => SpotMessageReceiveService(message, binanceApi, axios,
            SignalFilterSubService, SignalDistributeSubService,
            SymbolHelper, IndicatorHelper, MarketTypeHelper, RequestHelper, StrategyHelper,
            SymbolInformationGlobal,
            MarketTypeEnum, StrategyEnum,
            DefinitionsIO, LogIO, AccountsIO, StrategiesIO))
    },

    registerSymbolCurrentPriceSCIService(SymbolCurrentPriceSCIService, binanceApi, SymbolInformationGlobal, MarketTypeEnum, SymbolHelper) {
        binanceApi.ws.allTickers(tickers => SymbolCurrentPriceSCIService(tickers, SymbolInformationGlobal, MarketTypeEnum, SymbolHelper))
    },

    registerSymbolCurrentPriceFuturesService(SymbolCurrentPriceFuturesService, binanceApi, SymbolInformationGlobal, MarketTypeEnum, SymbolHelper) {
        binanceApi.ws.futuresAllTickers(tickers => SymbolCurrentPriceFuturesService(tickers, SymbolInformationGlobal, MarketTypeEnum, SymbolHelper))
    }
}

module.exports = Websocket