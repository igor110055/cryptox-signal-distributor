
function StrategiesIO(BaseIO) {

    function getStrategies(){
        return BaseIO.readJson(BaseIO.DIR_DATABASE + 'strategies.json')
    }   

    return {
        getStrategies
    }
}

module.exports = StrategiesIO