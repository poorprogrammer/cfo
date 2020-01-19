import API from '@/services/invoices'

describe('invoices API', () => {
  let api = new API()
  
  it('should be empty list initally or the screen would not render', () => {
    expect(api.invoicesUrl()).toEqual('http://api:3000/invoices/2020')
  })
})