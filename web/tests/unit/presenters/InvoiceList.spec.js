import Presenter from '@/presenters/InvoiceList'

describe('InvoiceList Presenter', () => {
  it('should have invoices', () => {
    let p = new Presenter()
    expect([]).toEqual(p.invoices)
  })
})
