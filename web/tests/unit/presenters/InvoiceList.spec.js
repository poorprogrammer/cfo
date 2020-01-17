import Presenter from '@/presenters/InvoiceList'

describe('InvoiceList Presenter', () => {
  let p = new Presenter()
  describe('invoices', () => {
    it('should be empty list initally or the screen would not render', () => {
      expect([]).toEqual(p.invoices)
    })
  })
  describe('headers', () => {
    it('should contains correct headers', () => {
      expectHeadersToBeCorrect(p.headers)
    })

    let expectHeadersToBeCorrect = (headers) => {
      expect('Number').toEqual(headers[0].text)
      expect('Date').toEqual(headers[1].text)
      expect('Amount (baht)').toEqual(headers[2].text)
    }
  })
  it('should get invoices from API when init', () => {
    p.API = new StubAPI()
    p.init()
    p.API.expectGetInvoicesToBeCalled()
  })
})

class StubAPI {
  constructor () {
    this.called = false
  }
  getInvoices () {
    this.called = true
    return Promise.resolve()
  }
  expectGetInvoicesToBeCalled() {
    expect(true).toEqual(this.called)
  }
}