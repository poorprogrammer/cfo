const config = require("config")

module.exports = class Auth {
    constructor(password) {
        this.password = password || config.get("PASSWORD")
    }

    login(password) {
        return new Promise((resolve, reject) => {
            if(password === this.password)
                resolve(password)
            else
                reject({status: 401, message: "Authentication failed"})
        })

    }
}