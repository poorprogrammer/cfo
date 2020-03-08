const invoices = require('../../../src/services/invoices')

describe('invoices', () => {
    it('should return a hardcoded array', () => {
        expect(invoices().length).toBe(7)
    })
})