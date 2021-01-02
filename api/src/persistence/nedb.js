const Datastore = require("nedb")
const config = require("config")

module.exports = class Database {
    constructor() {
        this.db = new Datastore({ filename: config.get("DB_PATH"), autoload: true })
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            this.db.insert(data, (e, docs) => {
                if (e != null) reject(e)
                resolve(docs)
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            this.db.update(data, (e, docs) => {
                if (e != null) reject(e)
                resolve(docs)
            })
        })
    }

    find(query) {
        return new Promise((resolve, reject) => {
            this.db.find(query, (e, docs) => {
                if (e != null) reject(e)
                resolve(docs)
            })
        })
    }

    findOne(query) {
        return new Promise((resolve, reject) => {
            this.db.findOne(query, (e, doc) => {
                if (e != null) reject(e)
                resolve(doc)
            })
        })
    }
}
