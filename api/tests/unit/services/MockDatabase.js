const Invoices = require('../../fixtures/invoicesData')

module.exports = class MockDatabase {
    insert(data) {
        return new Promise((resolve) => {
            resolve(data)
        })
    }
    update(data) {
        return new Promise((resolve) => {
            resolve(data)
        })
    }
    find() {
        return new Promise((resolve) => {
            resolve(Object.values(Invoices).filter((e) => !e.deleted))
        })
    }
    findOne(query) {
        let invoiceNumber = query.invoiceNumber
        return new Promise((resolve) => {
            resolve(Invoices[invoiceNumber])
        })
    }
    mockAll() {
        this.find = jest.fn();
    }
    mockUpdate(invoice) {
        this.update = jest.fn();
        let returnedValue = {...invoice}
        returnedValue._id = invoice.id

        this.update.mockResolvedValue(returnedValue)
    }
}