
function BaseIO(fs, path, DirectoriesGlobal) {    
    
    DirectoryInfo = {
        DIR_DATABASE: DirectoriesGlobal.getDatabase() + '\\',
        DIR_ACCOUNTS: path.join(DirectoriesGlobal.getDatabase(), 'accounts') + '\\',
        DIR_LOG: path.join(DirectoriesGlobal.getDatabase(), 'logs') + '\\',
        DIR_LOG_ERROR: path.join(DirectoriesGlobal.getDatabase(), 'logs', 'error') + '\\',
    }

    function ensureDirectories(){

        for(let [key, value] of Object.entries(this.DirectoryInfo)){
            if(!this.fileExists(value)){
                fs.mkdirSync(value)
                console.log(`Diretório ${key} criado`)
            }
        }
    }

    function readFile(path) {
        return fs.readFileSync(path, { encoding: 'utf8' })
    }

    function readJson(path) {
        return JSON.parse(fs.readFileSync(path, 'utf8'))
    }

    function readJsonFolder(dir) {
        const filenames = fs.readdirSync(dir)
        objs = []

        for (let filename of filenames) {
            const fullPath = dir + filename
            if (fs.lstatSync(fullPath).isFile()) {
                objs.push(readJson(fullPath))
            }
        }

        return objs
    }

    function readLineByLine(path) {
        return fs.readFileSync(path, 'utf8').split(/\r?\n/)
    }

    function writeFile(path, data) {
        fs.writeFileSync(path, data, { encoding: 'utf8' })
    }

    function writeJson(path, data) {
        fs.writeFileSync(path, JSON.stringify(data), { encoding: 'utf8' })
    }

    function appendFile(path, data) {
        fs.appendFileSync(path, data)
    }

    function fileExists(path) {
        return fs.existsSync(path)
    }

    function removeFile(path){
        fs.unlinkSync(path)
    }

    return {
        DirectoryInfo,
        ensureDirectories,
        readFile,
        readJson,
        readJsonFolder,
        readLineByLine,
        writeFile,
        writeJson,
        appendFile,
        fileExists,
        removeFile
    }
}

module.exports = BaseIO

