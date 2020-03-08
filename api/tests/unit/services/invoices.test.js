const Invoice = require('../../../src/services/invoice')
const MockDatabase = require('./MockDatabase')

describe('invoices', () => {
    var service = new Invoice(new MockDatabase())
    beforeEach(() => {})

    it('should return a hardcoded array', () => {
        service.all().then((invoices) => {
            expect(invoices.length).toBe(7)
        })
    })
})
