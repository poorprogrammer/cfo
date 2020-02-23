const Datastore = require('nedb')


module.exports = class Database {
    constructor() {
        db = new Datastore({ filename: '/tmp/cfo/invoices', autoload: true })
    }
    insert(data) {
        db.insert(data)
    }
}