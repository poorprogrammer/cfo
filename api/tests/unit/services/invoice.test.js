const invoice = require('../../../src/services/invoice')

describe('invoice', () => {
    it('should has invoiceNumber', () => {
        var inv = invoice('202001-001')
        expect(inv.invoiceNumber).toBe('202001-001')
    })
})