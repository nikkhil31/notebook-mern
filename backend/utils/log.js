import colors from 'colors'
import secrets from "./secrets.js"

class Log {

    constructor() {
        this.dev = secrets.IS_DEV
    }


    info(msg) {
        return this.dev && console.log(`${msg}`.white.underline) 
    }

    succ(msg) {
        return this.dev && console.log(`${msg}`.white.bold.bgGreen) 
    }

    war(msg) {
        return this.dev && console.log(`${msg}`.red.bold.bgYellow) 
    }

    err(msg) {
        return this.dev && console.log(`${msg}`.red.bgRed.bold) 
    }

    prod() {

    }
}



const log = new Log()

export default log