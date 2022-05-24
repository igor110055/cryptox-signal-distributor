
function SpotMessageReceiveService(message, binanceApi, axios,
    SignalFilterSubService, SignalDistributeSubService,
    SymbolHelper, IndicatorHelper, MarketTypeHelper, RequestHelper, StrategyHelper,
    SymbolInformationGlobal,
    MarketTypeEnum, StrategyEnum,
    DefinitionsIO, LogIO, AccountsIO, StrategiesIO) {

    // IFDA - Intercept, Filter, Distribute, Analyze    

    const { symbol, eventType, executionType, orderStatus, side } = message

    const symbolHelper = SymbolHelper(MarketTypeEnum, MarketTypeEnum.Spot, SymbolInformationGlobal, symbol)

    if (!symbolHelper.isValidSymbol()) {
        LogIO.log(`Um sinal foi interceptado (${symbol}) mas não é um símbolo válido`)
    }

    if (!DefinitionsIO.getAllowOperation()) {
        LogIO.log(`Um sinal foi interceptado (${symbol}) mas a operação está desabilitada`)
        return
    }

    if (process.uptime() < DefinitionsIO.getPastPricesSize()) {
        LogIO.log(`Um sinal foi interceptado (${symbol}) mas o projeto não está pronto`)
        return
    }

    if (eventType === 'executionReport') {
        if (executionType === 'NEW' && orderStatus === 'NEW' && side === 'BUY') {

            const canDistributeSignal = SignalFilterSubService(symbol, SymbolHelper, IndicatorHelper, MarketTypeEnum, SymbolInformationGlobal, LogIO)

            if (canDistributeSignal) {

                SignalDistributeSubService(symbol, axios,
                    MarketTypeHelper, RequestHelper, StrategyHelper,
                    MarketTypeEnum, StrategyEnum,
                    SymbolInformationGlobal,
                    AccountsIO, LogIO, StrategiesIO)
            }
        }
    }
}

module.exports = SpotMessageReceiveService