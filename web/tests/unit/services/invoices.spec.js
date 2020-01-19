import API from '@/services/invoices'
import axios from 'axios'
describe('invoices API', () => {
  let api;

  beforeEach(() => {
    api = new API()
  })

  it('should be empty list initally or the screen would not render', () => {
    expect(api.invoicesUrl()).toEqual('http://api:3000/invoices/2020')
  })

  it('should retrive list of invoice from proper api', () => {
    jest.spyOn(axios, 'get')
    api.getInvoices();
    expect(axios.get).toHaveBeenCalled();
  })
})