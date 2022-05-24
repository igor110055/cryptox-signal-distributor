
const DirectoriesGlobal = {
    
    defineRoot(rootPath){
        global.rootPath = rootPath
    },

    getRoot(){
        return global.rootPath
    },

    defineDatabase(dbPath){
        global.dbPath = dbPath
    },

    getDatabase(){
        return global.dbPath
    }
}

module.exports = DirectoriesGlobal