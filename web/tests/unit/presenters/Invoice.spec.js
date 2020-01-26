import Presenter from '@/presenters/Invoice'

describe('Invoice Presenter', () => {
  let p = new Presenter()
  it('should get invoice with specific number from API when init', () => {
    let invoiceNumber = '202001-001'
    p.API = new StubAPI()
    p.init(invoiceNumber)
    p.API.expectGetInvoiceToBeCalledWith(invoiceNumber)
  })
  it('should has invoice with data after init', async() => {
    p.API = new MockAPI('202001-001')
    await p.init()
    expect(p.invoice.invoiceNumber).toEqual('202001-001')
    expect(Array.isArray(p.invoice.getItems())).toEqual(true)
  })
})

class StubAPI {
  constructor () {
    this.called = false
  }
  getInvoice (invoiceNumber) {
    this.called = true
    this.actual = invoiceNumber
    return Promise.resolve()
  }
  expectGetInvoiceToBeCalledWith(expected) {
    expect(true).toEqual(this.called)
    expect(expected).toEqual(this.actual)
  }
}

class MockAPI {
  constructor (invoiceNumber) {
    this.invoiceNumber = invoiceNumber
  }
  getInvoice () {
    return Promise.resolve({
      invoiceNumber: this.invoiceNumber
    })
  }
}