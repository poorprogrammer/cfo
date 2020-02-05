const invoice = require('../../../src/services/invoice')

describe('invoice', () => {
    it('should have invoiceNumber', () => {
        var inv = invoice('202001-001')
        expect(inv.invoiceNumber).toBe('202001-001')
    })
    it('should have target company name', () => {
        var inv = invoice('202001-007')
        expect(inv.targetCompany.name).toBe('Facebook HQ')
    })
    it('should have target company address', () => {
        var inv = invoice('202001-007')
        var expected = '1601 Willow Rd Menlo Park, California'
        expect(inv.targetCompany.address).toBe(expected)
    })
    it('should have target company tax id', () => {
        var inv = invoice('202001-007')
        expect(inv.targetCompany.taxId).toBe('0100008000007')
    })
    it('should have target company telephone number', () => {
        var inv = invoice('202001-007')
        expect(inv.targetCompany.tel).toBe('+1 650-960-1300')
    })
})