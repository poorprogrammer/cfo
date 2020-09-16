import Presenter from '@/presenters/Invoice'

class MockView {
  goTo() {}
}

describe('Invoice Presenter', () => {
  let p = new Presenter(new MockView())
  let invoiceNumber = '202001-001'

  it('should get invoice with specific number from API when init', () => {
    jest.spyOn(p.API, 'getInvoice')
    p.init(invoiceNumber)
    expectToBeCalledWith(p.API, invoiceNumber)
  })
  it('should save the current invoice', () => {
    jest.spyOn(p.API, 'save')
    p.invoice.invoiceNumber = invoiceNumber
    p.save()
    expect(p.API.save).toHaveBeenCalledWith(p.invoice)
  })
  it('should redirect to view page after save new invoice so it is ready to be printed', async () => {
    givenSaveSuccessWithInvoiceNumber(invoiceNumber)
    await p.save()
    expectToRedirectToViewInvoicePage(p.view, invoiceNumber)
  })
  function givenSaveSuccessWithInvoiceNumber(invoiceNumber) {
    jest.spyOn(p.view, 'goTo')
    jest.spyOn(p.API, 'save').mockResolvedValue(invoiceNumber)
  }
  function expectToBeCalledWith(api, invoiceNumber) {
    expect(api.getInvoice).toHaveBeenCalled()
    expect(api.getInvoice.mock.calls[0][0]).toEqual(invoiceNumber)
  }
  function expectToRedirectToViewInvoicePage(view, invoiceNumber) {
    expect(view.goTo).toHaveBeenCalledWith({name: 'invoice', params: {invoiceNumber: invoiceNumber}})
  }
})
