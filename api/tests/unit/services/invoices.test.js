const invoices = require('../../../src/services/invoices')

describe('invoices', () => {
    it('should return an array', () => {
        expect(invoices().length).toBe(7)
    })
})