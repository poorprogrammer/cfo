const Database = require("../persistence/nedb");
const m = require("../queue/message");
const Sender = require("../queue/sender");

module.exports = class Invoice {
    constructor(db, sender) {
        this.db = db || new Database('invoice')
        this.sender = sender || Sender.create()
    }

    get(invoiceNumber) {
        return this.db.findOne({invoiceNumber: invoiceNumber})
    }

    all(year) {
        return this.db.find({invoiceDate: new RegExp(year), deleted: {$ne: true}})
    }

    save(invoice) {
        return this.db.insert(invoice).then((inv) => {
            this.sender.send('invoice-created', m.invoiceCreatedMessage(inv))
            return inv.invoiceNumber
        })
    }

    update(invoice) {
        return this.db.update({_id: invoice.id}, invoice).then((inv) => {
            return inv
        })
    }
}
