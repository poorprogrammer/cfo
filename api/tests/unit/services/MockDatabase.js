const Invoices = require('../../fixtures/invoicesData')

module.exports = class MockDatabase {
    insert(data) {
        return new Promise((resolve) => {
            resolve(data)
        })
    }
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