const axios = require('axios').default
const fs = require('fs')
const path = require('path')
const GenerateUniqueId = require('generate-unique-id');

const DirectoriesGlobal = require('./Globals/Directories')
DirectoriesGlobal.defineRoot(path.join(path.resolve(__dirname), '..'))
DirectoriesGlobal.defineDatabase(path.join(DirectoriesGlobal.getRoot(), 'db'))
const SymbolInformationGlobal = require('./Globals/SymbolInformation')

const Cron = require('./Cron')
const Websocket = require('./Websocket')

const MarketTypeEnum = require('./Enums/MarketType')
const StrategyEnum = require('./Enums/Strategy')

const DateHelper = require('./Helpers/Date')
const SymbolHelper = require('./Helpers/Symbol')
const IndicatorHelper = require('./Helpers/Indicator')
const MarketTypeHelper = require('./Helpers/MarketType')
const RequestHelper = require('./Helpers/Request')
const StrategyHelper = require('./Helpers/Strategy')

const SpotMessageReceiveService = require('./Services/SpotMessageReceive/SpotMessageReceive')
const SignalFilterSubService = require('./Services/SpotMessageReceive/Filter')
const SignalDistributeSubService = require('./Services/SpotMessageReceive/Distribute')

const SymbolCurrentPriceSCIService = require('./Services/SymbolCurrentPriceSCI')
const SymbolCurrentPriceFuturesService = require('./Services/SymbolCurrentPriceFutures')

const SymbolInformationService = require('./Services/SymbolInformation')
const SymbolPastPriceService = require('./Services/SymbolPastPrice')

const BaseIO = require('./Io/Base')(fs, path, DirectoriesGlobal)
const DefinitionsIO = require('./Io/Definitions')(BaseIO)
const AccountsIO = require('./Io/Accounts')(BaseIO)
const StrategiesIO = require('./Io/Strategies')(BaseIO)
const LogIO = require('./Io/Log')(BaseIO, DefinitionsIO, DateHelper)

const Binance = require('binance-api-node').default
const binanceApi = Binance({ ...DefinitionsIO.getBinanceApiInfo() })

async function MainApplication() {

    BaseIO.ensureDirectories()
    SymbolInformationGlobal.Init()

    await SymbolInformationService(axios, MarketTypeEnum, SymbolInformationGlobal, DefinitionsIO)    

    Websocket.registerSpotMessageReceiveService(SpotMessageReceiveService, binanceApi, axios,
        SignalFilterSubService, SignalDistributeSubService,
        SymbolHelper, IndicatorHelper, MarketTypeHelper, RequestHelper, StrategyHelper,
        SymbolInformationGlobal,
        MarketTypeEnum, StrategyEnum,
        DefinitionsIO, LogIO, AccountsIO, StrategiesIO)

    Websocket.registerSymbolCurrentPriceSCIService(SymbolCurrentPriceSCIService, binanceApi, SymbolInformationGlobal, MarketTypeEnum, SymbolHelper)
    Websocket.registerSymbolCurrentPriceFuturesService(SymbolCurrentPriceFuturesService, binanceApi, SymbolInformationGlobal, MarketTypeEnum, SymbolHelper)

    Cron.registerSymbolInformationService(SymbolInformationService, axios, MarketTypeEnum, SymbolInformationGlobal, DefinitionsIO)
    Cron.registerSymbolPastPriceService(SymbolPastPriceService, SymbolInformationGlobal, MarketTypeEnum, DefinitionsIO, SymbolHelper)

    LogIO.log('Dealer inicializado com sucesso')
}

MainApplication()