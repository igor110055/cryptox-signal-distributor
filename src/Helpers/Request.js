
function RequestHelper() {

    function buildEndpoint(url, port, useHttps = true) {

        let endpoint = ''

        if (useHttps) {
            endpoint += 'https://'
        }
        else {
            endpoint += 'http://'
        }

        endpoint += url
        endpoint += ':'
        endpoint += port

        return endpoint
    }

    return {
        buildEndpoint
    }
}

module.exports = RequestHelper