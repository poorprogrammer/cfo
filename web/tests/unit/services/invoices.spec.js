import API from '@/services/invoices'
import axios from 'axios'
describe('invoices API', () => {
  let api;

  beforeEach(() => {
    api = new API()
  })

  it('should have invoice url as /invoices/:year', () => {
    expect(api.invoicesUrl()).toEqual('http://api:3000/invoices/2020')
  })

  it('should retrive list of invoice from proper api', () => {
    jest.spyOn(axios, 'get')
    api.getInvoices()
    expect(axios.get).toHaveBeenCalled()
  })

  it('should parse response into Invoice', async() => {
    let response = { data: [{invoiceNumber: '202001-001'}] }
    jest.spyOn(axios, 'get').mockResolvedValue(response)
    let invoices = await api.getInvoices()
    expect(invoices[0].url()).toEqual('/invoice/202001-001')
  })
})