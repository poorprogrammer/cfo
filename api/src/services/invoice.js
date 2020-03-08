const Invoices = require('../persistence/invoices')

module.exports = class Invoice {
    get(invoiceNumber) {
        return Invoices[invoiceNumber]
    }
    all() {
        return Object.values(Invoices)
    }
}
