const Invoices = require('../persistence/invoices')

module.exports = function invoices() {
    return Object.values(Invoices)
}