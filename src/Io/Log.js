
function LogIO(BaseIO, DefinitionsIO, DateHelper){

    function log(data){
        if (typeof (data) !== 'string') {
            data = JSON.stringify(data)
        }

        let fileName = DateHelper.currentDate() + '.log'
        BaseIO.appendFile(BaseIO.DirectoryInfo.DIR_LOG + fileName, '\n' + data)

        if(DefinitionsIO.getDebug()){
            console.log(data)
        }
    }

    function logError(data){
        if (typeof (data) !== 'string') {
            data = JSON.stringify(data)
        }

        let fileName = DateHelper.currentDate() + '.log'
        BaseIO.appendFile(BaseIO.DirectoryInfo.DIR_LOG_ERROR + fileName, '\n' + data)

        if(DefinitionsIO.getDebug()){
            console.error(data)
        }
    }

    return {
        log,
        logError
    }
}

module.exports = LogIO