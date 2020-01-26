const Invoices = require('../persistence/invoices')

module.exports = function invoice(invoiceNumber) {
    return Invoices[invoiceNumber]
}