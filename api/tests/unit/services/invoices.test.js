const Invoice = require('../../../src/services/invoice')

describe('invoices', () => {
    it('should return a hardcoded array', () => {
        new Invoice().all().then((invoices) => {
            expect(invoices.length).toBe(7)
        })
    })
})