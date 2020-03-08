const Invoices = require('../persistence/invoices')

module.exports = class Invoice {
    get(invoiceNumber) {
        return new Promise((resolve, _) => {
            resolve(Invoices[invoiceNumber])
        })
    }
    all() {
        return Object.values(Invoices)
    }
}
