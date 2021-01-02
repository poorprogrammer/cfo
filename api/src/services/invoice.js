const Database = require("../persistence/nedb")

module.exports = class Invoice {
    constructor(db) {
        this.db = db || new Database()
    }

    get(invoiceNumber) {
        return this.db.findOne({invoiceNumber: invoiceNumber})
    }

    all(year) {
        return this.db.find({invoiceDate: new RegExp(year)})
    }

    save(invoice) {
        return this.db.insert(invoice).then((inv) => {
            return inv.invoiceNumber
        })
    }

    update(invoice) {
        return this.db.update(invoice)
    }
}
