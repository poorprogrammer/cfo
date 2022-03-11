import { describe, it, expect, vi } from "vitest";
import Presenter from '@/presenters/Invoice'
import API from '@/services/invoices'

describe('Invoice Presenter', () => {
  let p = new Presenter(new MockView(), new API())
  let invoiceNumber = '202001-001'

  it('should get invoice with specific number from API when init', () => {
    vi.spyOn(p.API, 'get')
    p.init(invoiceNumber)
    expectToBeCalledWith(p.API, invoiceNumber)
  })
  it('should save the current invoice', () => {
    vi.spyOn(p.API, 'save')
    p.invoice.invoiceNumber = invoiceNumber
    p.save()
    expect(p.API.save).toHaveBeenCalledWith(p.invoice)
  })
  it('should redirect to view page after save new invoice so it is ready to be printed', async () => {
    givenSaveSuccessWithInvoiceNumber(invoiceNumber)
    await p.save()
    expectToRedirectToViewInvoicePage(p.view, invoiceNumber)
  })
  it('should show error after save duplicated invoice', async () => {
    givenSaveFailedWithError('Error: Request failed with status code 500')
    await p.save()
    expectPopupShownWithError('Error: Request failed with status code 500')
  })
  function givenSaveSuccessWithInvoiceNumber(invoiceNumber) {
    vi.spyOn(p.view, 'goTo')
    p.API = new MockAPISaveSuccess(invoiceNumber);
  }
  function givenSaveFailedWithError(err) {
    vi.spyOn(p, 'showError').mockImplementation()
    p.API = new MockAPISaveFail(err)
  }
  function expectToBeCalledWith(api, invoiceNumber) {
    expect(api.get).toHaveBeenCalled()
    expect(api.get.mock.calls[0][0]).toEqual(invoiceNumber)
  }
  function expectToRedirectToViewInvoicePage(view, invoiceNumber) {
    expect(view.goTo).toHaveBeenCalledWith({name: 'invoice', params: {number: invoiceNumber}})
  }
  function expectPopupShownWithError(error) {
    expect(p.showError).toHaveBeenCalledWith(error)
  }
})

class MockView {
  goTo() {}
}

class MockAPISaveSuccess {
  constructor(invoiceNumber) {
    this.invoiceNumber = invoiceNumber;
  }
  save() {
    return Promise.resolve(this.invoiceNumber);
  }
}

class MockAPISaveFail {
  constructor(error) {
    this.error = error;
  }
  save() {
    return Promise.reject(this.error);
  }
}