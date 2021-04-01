const fs = require('fs')
const util = require('util')

const readPromise = util.promisify(fs.readFile)

async function main() {
    const dataCampanha = await readPromise('./data/CAMPANHA.txt', "UTF-8", (res, err) => {
        if(err) return console.log(err)
        return await res
    })
    returnconsole.log(dataCampanha)
}

main()