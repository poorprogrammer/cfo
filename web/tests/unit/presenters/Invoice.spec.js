import Presenter from '@/presenters/Invoice'
import Invoice from "../../../src/models/Invoice"

class MockView {
  goTo() {}
}

describe('Invoice Presenter', () => {
  let p = new Presenter(new MockView())
  it('should get invoice with specific number from API when init', () => {
    let invoiceNumber = '202001-001'
    jest.spyOn(p.API, 'getInvoice')
    p.init(invoiceNumber)
    expect(p.API.getInvoice).toHaveBeenCalled()
    expect(p.API.getInvoice.mock.calls[0][0]).toEqual(invoiceNumber)
  })
  it('should redirect to view page after save new invoice so it is ready to be printed', () => {
    jest.spyOn(p.view, 'goTo')
    p.invoice.invoiceNumber = '202009-013'
    p.save()
    expect(p.view.goTo).toHaveBeenCalledWith({name: 'invoice', params: {invoiceNumber: '202009-013'}})
  })
})
