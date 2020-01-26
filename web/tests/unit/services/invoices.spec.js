import API from '@/services/invoices'
import axios from 'axios'
describe('invoices API', () => {
  let api;

  beforeEach(() => { api = new API() })

  describe('getInvoices', () => {
    describe('before call', () => {
      beforeEach(() => {
        jest.spyOn(axios, 'get')
        api.getInvoices()
      })

      it('should call api', () => {
        expect(axios.get).toHaveBeenCalled()
      })
      it('should call with correct url', () => {
        expect(axios.get.mock.calls[0][0]).toEqual('http://api:3000/invoices/2020')
      })
    })

    describe('after call', () => {
      beforeEach(() => {
        let response = { data: [{invoiceNumber: '202001-001'}] }
        jest.spyOn(axios, 'get').mockResolvedValue(response)
      })

      it('should parse response into Invoice', async() => {
        let invoices = await api.getInvoices()
        expect(invoices[0].url()).toEqual('/invoice/202001-001')
      })
    })
  })
})