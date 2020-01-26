import Invoice from "../../../src/models/Invoice"

describe('Invoice', () => {
  it('should be able to new empty invoice or Invoice page will not load', () => {
    new Invoice()
  })

  describe('parsing json data', () => {
    let json = {
      amount: 130000,
      companySlug: 'spacex',
      invoiceDate: '2020-01-03',
      invoiceNumber: '202001-001',
      items: [
        {
          name: 'Developer',
          price: 20000,
          amount: 20,
        },
        {
          name: 'Scrum master',
          price: 80,
          amount: 10,
        },
      ]
    }

    let invoice = new Invoice(json)

    it('should have invoiceNumber', () => {
      expect(invoice.invoiceNumber).toEqual('202001-001')
    })

    it('should have companySlug', () => {
      expect(invoice.companySlug).toEqual('spacex')
    })

    it('should have invoiceDate', () => {
      expect(invoice.invoiceDate).toEqual('2020-01-03')
    })

    it('should have items as Array', () => {
      expect(Array.isArray(invoice.getItems())).toEqual(true)
    })

    describe('for each item', () => {
      let item = invoice.getItems()[1]

      it('should have a name', () => {
        expect(item.name).toEqual('Scrum master')
      })

      it('should have a price', () => {
        expect(item.price).toEqual(80)
      })

      it('should have an amount', () => {
        expect(item.amount).toEqual(10)
      })

      it('should have a total', () => {
        expect(item.total()).toEqual(80 * 10)
      })
    })
    describe('total', () => {
      it('should follow last item', () => {
        let total = invoice.getItems()[2]
        expect(total.name).toEqual('Total')
        expect(total.total()).toEqual(400800)
      })
    })
    describe('tax', () => {
      it('should follow total', () => {
        let tax = invoice.getItems()[3]
        expect(tax.name).toEqual('Tax')
        expect(tax.total()).toEqual(400800 * 0.07)
      })
    })
  })
})