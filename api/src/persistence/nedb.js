const Datastore = require("nedb")
const config = require("config")

module.exports = class Database {
    constructor() {
        this.db = new Datastore({ filename: config.get("DB_PATH"), autoload: true })
        this.db.ensureIndex({ fieldName: 'invoiceNumber', unique: true }, function (err) {
            console.log(err)
        });

    }

    insert(data) {
        return new Promise((resolve, reject) => {
            this.db.insert(data, (e, docs) => {
                if (e != null) reject(e)
                resolve(docs)
            })
        })
    }

    update(id, data) {
        return new Promise((resolve, reject) => {
            this.db.update(id, data, {}, (e, n, docs) => {
                if (e != null || n === 0) reject(e)
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
