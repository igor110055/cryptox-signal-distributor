
const Cron = {

    registerSymbolInformationService(SymbolInformationService, axios, MarketTypeEnum, SymbolInformationGlobal, DefinitionsIO) {
        setInterval(() => SymbolInformationService(axios, MarketTypeEnum, SymbolInformationGlobal, DefinitionsIO), 1000 * 60 * 60 * 12)
    },

    registerSymbolPastPriceService(SymbolPastPriceService, SymbolInformationGlobal, MarketTypeEnum, DefinitionsIO, SymbolHelper) {
        setInterval(() => SymbolPastPriceService(SymbolInformationGlobal, MarketTypeEnum, DefinitionsIO, SymbolHelper), 1000)
    }
}

module.exports = Cron