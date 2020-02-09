const invoice = require('../../../src/services/invoice')

describe('invoice', () => {
    var inv = invoice('202001-007')
    it('should have invoiceNumber', () => {
        expect(inv.invoiceNumber).toBe('202001-007')
    })
    it('should have target company name', () => {
        expect(inv.targetCompany.name).toBe('Facebook HQ')
    })
    it('should have target company address', () => {
        var expected = '1601 Willow Rd Menlo Park, California'
        expect(inv.targetCompany.address).toBe(expected)
    })
    it('should have target company tax id', () => {
        expect(inv.targetCompany.taxId).toBe('0100008000007')
    })
    it('should have target company telephone number', () => {
        expect(inv.targetCompany.tel).toBe('+1 650-960-1300')
    })
    it('should have from company name', () => {
        expect(inv.fromCompany.name).toBe('ODDS HQ')
    })
    it('should have from company address', () => {
        expect(inv.fromCompany.address).toBe('69 We are not hiring')
    })
    it('should have from company tax id', () => {
        expect(inv.fromCompany.taxId).toBe('0100000000000')
    })
    it('should have from company telephone number', () => {
        expect(inv.fromCompany.tel).toBe('+66896669999')
    })
})