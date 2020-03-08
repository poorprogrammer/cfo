const Database = require("../persistence/nedb")

module.exports = class Invoice {
    constructor(db) {
        this.db = db || new Database()
    }

    get(invoiceNumber) {
        return this.db.findOne({invoiceNumber: invoiceNumber})
    }

    all() {
        return this.db.find({invoiceDate: /2020/})
    }
}
