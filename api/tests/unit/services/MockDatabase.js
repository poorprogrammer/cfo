const Invoices = require('./invoices')

module.exports = class MockDatabase {
    find() {
        return new Promise((resolve) => {
            resolve(Object.values(Invoices))
        })
    }
    findOne(query) {
        let invoiceNumber = query.invoiceNumber
        return new Promise((resolve) => {
            resolve(Invoices[invoiceNumber])
        })
    }
}