import API from '@/services/invoices'
import axios from 'axios'
describe('invoices API', () => {
  let api;

  beforeEach(() => { api = new API() })

  describe('getInvoices', () => {
    describe('before call', () => {
      beforeEach(() => {
        jest.spyOn(axios, 'get')
        api.getInvoices(2020)
      })

      it('should call api', () => {
        expect(axios.get).toHaveBeenCalled()
      })
      it('should call with correct url', () => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/invoices/2020')
      })
    })

    describe('after call', () => {
      beforeEach(() => {
        let response = { data: [{ invoiceNumber: '202001-001' }] }
        jest.spyOn(axios, 'get').mockResolvedValue(response)
      })

      it('should parse response into Invoice', async () => {
        let invoices = await api.getInvoices()
        expect(invoices[0].url()).toEqual('/invoice/202001-001')
      })
    })
  })
  describe('getInvoice', () => {
    describe('after call', () => {
      beforeEach(() => {
        let response = { data: { invoiceNumber: '202001-001' } }
        jest.spyOn(axios, 'get').mockResolvedValue(response)
      })

      it('should parse response into Invoice', async () => {
        let invoice = await api.getInvoice('202001-001')
        expect(invoice.url()).toEqual('/invoice/202001-001')
      })
    })
  })
  describe('save', () => {
    describe('after call', () => {
      it('should parse response into invoiceNumber', async () => {
        let invoiceNumber = api.parseInvoiceNumber({data: '202001-001'})
        expect(invoiceNumber).toEqual('202001-001')
      })
    })
  })
})