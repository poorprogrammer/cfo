const Invoices = require('../persistence/invoices')

module.exports = class Invoice {
    get(invoiceNumber) {
        return new Promise((resolve) => {
            resolve(Invoices[invoiceNumber])
        })
    }
    all() {
        return new Promise((resolve) => {
            resolve(Object.values(Invoices))
        })
    }
}
