import API from '@/services/invoices'

describe('invoices API', () => {

  it('should be empty list initally or the screen would not render', () => {
    let api = new API()
    expect(api.invoicesUrl()).toEqual('http://api:3000/invoices/2020')
  })
})