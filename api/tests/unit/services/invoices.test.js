const Invoice = require('../../../src/services/invoice')

describe('invoices', () => {
    it('should return a hardcoded array', () => {
        expect(new Invoice().all().length).toBe(7)
    })
})