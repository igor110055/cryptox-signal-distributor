
async function SignalDistributeSubService(symbol, axios,
    MarketTypeHelper, RequestHelper, StrategyHelper,
    MarketTypeEnum, StrategyEnum,
    SymbolInformationGlobal,
    AccountsIO, LogIO, StrategiesIO) {

    const accounts = AccountsIO
        .readAllAccountsJson()
        .sort((a, b) => a.priority - b.priority)

    if (accounts.length == 0) {
        Log.IO('O sinal foi recebido e passou no filtro, porém não há nenhuma conta cadastrada para distribuição')
        return
    }

    const marketTypeHelper = MarketTypeHelper(MarketTypeEnum, SymbolInformationGlobal)
    const symbolMarkets = marketTypeHelper.getSymbolMarkets(symbol)
    const strategyHelper = StrategyHelper(StrategyEnum, MarketTypeEnum, StrategiesIO)
    const requestHelper = RequestHelper()

    if (symbolMarkets.length == 0) {
        throw new Error('SignalDistributeSubService symbolMarkets.length == 0')
    }

    for (let account of accounts) {

        const { id, binanceApiInfo, serverIp, serverPort, strategy } = account

        if (!binanceApiInfo) {
            LogIO.error(`Conta de id ${id} com binanceApiInfo não preenchido`)
        }

        else if (!serverIp) {
            LogIO.error(`Conta de id ${id} com serverPort não preenchido`)
        }

        else if (!serverPort) {
            LogIO.error(`Conta de id ${id} com serverPort não preenchido`)
        }

        else if (!strategy) {
            LogIO.error(`Conta de id ${id} com strategy não preenchido`)
        }

        else if (!StrategyEnum.values().includes(strategy)) {
            LogIO.error(`Conta de id ${id} com strategy não existente`)
        }

        else {
            const market = marketTypeHelper.getMarketPreference(symbolMarkets)
            const params = strategyHelper.getParamsByStrategyAndMarket(strategy, market)

            const obj = {
                symbol,
                market,
                params,
                binanceApiInfo
            }

            const endpoint = requestHelper.buildEndpoint(serverIp, serverPort)

            axios.post(endpoint, obj)
                .catch(err => {
                    LogIO.error(`SignalDistributeSubService axios.post accountId ${id}`)
                    console.error(err)
                })
        }
    }
}

module.exports = SignalDistributeSubService