import Presenter from '@/presenters/Invoice'

describe('Invoice Presenter', () => {
  let p = new Presenter()
  it('should get invoice with specific number from API when init', () => {
    let invoiceNumber = '202001-001'
    jest.spyOn(p.API, 'getInvoice')
    p.init(invoiceNumber)
    expect(p.API.getInvoice).toHaveBeenCalled()
    expect(p.API.getInvoice.mock.calls[0][0]).toEqual(invoiceNumber)
  })
})