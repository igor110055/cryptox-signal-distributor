

function AccountsIO(BaseIO){

    function create(name, binanceApiInfo, priority, serverIp, serverPort, strategy, GenerateUniqueId){

        const id = GenerateUniqueId()

        const obj = {
            id,
            name,
            priority,
            serverIp,
            serverPort,
            strategy,
            binanceApiInfo,
            enabled: true
        }        

        BaseIO.writeJson(BaseIO.DIR_ACCOUNTS + id + '.json', obj)
    }

    function readAllAccountsJson(){
        return BaseIO.readJsonFolder(BaseIO.DIR_ACCOUNTS)
    }

    function readById(id){
    }

    function remove(id){
    }

    function disable(){
    }

    return {
        create,
        readAllAccountsJson
    }
}

module.exports = AccountsIO