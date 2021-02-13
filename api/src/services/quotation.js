const Database = require("../persistence/nedb");
const m = require("../queue/message");
const Sender = require("../queue/sender");

module.exports = class Quotation {
    constructor(db, sender) {
        this.db = db || new Database('quotation')
        this.sender = sender || Sender.create()
    }

    get(quotationNumber) {
        return this.db.findOne({quotationNumber: quotationNumber})
    }

    all(year) {
        return this.db.find({quotationDate: new RegExp(year), deleted: {$ne: true}})
    }

    save(quotation) {
        return this.db.insert(quotation).then((inv) => {
            this.sender.send('quotation-created', m.quotationCreatedMessage(inv))
            return inv.quotationNumber
        })
    }

    update(quotation) {
        return this.db.update({_id: quotation.id}, quotation).then((inv) => {
            return inv
        })
    }
}
