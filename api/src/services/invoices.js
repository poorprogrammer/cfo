const Database = require("../persistence/nedb")

module.exports = function invoices() {
    return new Database().find({invoiceDate: /2020/})
}