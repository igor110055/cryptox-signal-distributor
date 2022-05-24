
function SymbolInformationGlobal(MarketTypeEnum, marketType) {

    function get() {
        if (marketType === MarketTypeEnum.Spot) {
            return global.SymbolInformation.Spot
        }

        else if (marketType == MarketTypeEnum.Crossed) {
            return global.SymbolInformation.Crossed
        }

        else if (marketType == MarketTypeEnum.Isolated) {
            return global.SymbolInformation.Isolated
        }

        else if (marketType == MarketTypeEnum.Futures) {
            return global.SymbolInformation.Futures
        }
        throw new Error('SymbolInformationGlobal::get wrong marketType')
    }

    function set(newSymbolInformation) {
        if (marketType == MarketTypeEnum.Spot) {
            global.SymbolInformation.Spot = newSymbolInformation
        }

        else if (marketType == MarketTypeEnum.Crossed) {
            global.SymbolInformation.Crossed = newSymbolInformation
        }

        else if (marketType == MarketTypeEnum.Isolated) {
            global.SymbolInformation.Isolated = newSymbolInformation
        }

        else if (marketType == MarketTypeEnum.Futures) {
            global.SymbolInformation.Futures = newSymbolInformation
        }
        else{
            throw new Error('SymbolInformationGlobal::set wrong marketType')
        }
    }

    function getSymbolList() {
        return get().map(s => s.symbol)
    }

    function symbolExists(symbol) {
        return getSymbolList.includes(symbol)
    }

    return {
        get,
        set,
        getSymbolList,
        symbolExists
    }
}

SymbolInformationGlobal.Init = () => {
    global.SymbolInformation = {
        Spot: [],
        Crossed: [],
        Isolated: [],
        Futures: []
    }
}

module.exports = SymbolInformationGlobal