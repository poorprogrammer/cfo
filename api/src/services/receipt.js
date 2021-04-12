const Database = require("../persistence/nedb");
const m = require("../queue/message");
const Sender = require("../queue/sender");

module.exports = class Receipt {
    constructor(db, sender) {
        this.db = db || new Database('receipt')
        this.sender = sender || Sender.create()
    }

    get(receiptNumber) {
        return this.db.findOne({receiptNumber: receiptNumber})
    }

    all(year) {
        return this.db.find({receiptDate: new RegExp(year), deleted: {$ne: true}})
    }

    save(receipt) {
        return this.db.insert(receipt).then((inv) => {
            this.sender.send('receipt-created', m.receiptCreatedMessage(inv))
            return inv.receiptNumber
        })
    }

    update(receipt) {
        return this.db.update({_id: receipt.id}, receipt).then((inv) => {
            return inv
        })
    }
}
