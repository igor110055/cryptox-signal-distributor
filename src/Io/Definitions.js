
function DefinitionsIO(BaseIO) {
    
    const definitionsJson = BaseIO.readJson(BaseIO.DirectoryInfo.DIR_DATABASE + 'definitions.json')

    function getAllowOperation() {
        return definitionsJson.allowOperation
    }

    function getSignalReceiveServerPort() {
        return definitionsJson.signalReceiveServerPort
    }

    function getPastPricesSize(){
        return definitionsJson.pastPricesSize
    }

    function getDebug(){
        return definitionsJson.debug
    }

    function getBinanceApiInfo() {
        return definitionsJson.binanceApiInfo
    }

    function getOperationalAssets() {
        return definitionsJson.operationalAssets
    }

    return {
        getAllowOperation,
        getSignalReceiveServerPort,
        getPastPricesSize,
        getDebug,
        getBinanceApiInfo,
        getOperationalAssets
    }
}

module.exports = DefinitionsIO