import Presenter from '@/presenters/InvoiceList'

describe('InvoiceList Presenter', () => {
  let p = new Presenter()
  describe('invoices', () => {
    describe('when there no invoices', () => {
      it('should be empty list initally or the screen would not render', () => {
        expect([]).toEqual(p.invoices)
      })
    })
    describe('when there is an invoice', () => {
      beforeEach(() => {
        let invoices = [ {invoiceNumber: '202001-001'} ]
        p.setInvoices(invoices)
      })

      it('should go to view invoice when clicked', () => {
        let invoice = p.invoices[0]
        expect(invoice.url()).toEqual('/202001-001/invoice')
      })
    })
  })
  describe('headers', () => {
    it('should contains correct headers', () => {
      expectHeadersToBeCorrect(p.headers)
    })

    it('should keep amount out of invoice list page for privacy', () => {
      p.headers.forEach(header => {
        expect(Object.values(header)).not.toContain('amount')
      });
    })

    let expectHeadersToBeCorrect = (headers) => {
      expect('Number').toEqual(headers[0].text)
      expect('Company').toEqual(headers[1].text)
      expect('Date').toEqual(headers[2].text)
    }
  })
  it('should get invoices from API when init', () => {
    p.API = new StubAPI()
    p.init()
    p.API.expectGetInvoicesToBeCalled()
  })
  it('should sort by decending invoice number', () => {
    expect(p.sortBy()).toEqual("invoiceNumber")
    expect(p.sortDesc()).toEqual(true)
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