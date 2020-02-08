import Invoice from "../../../src/models/Invoice"

describe('Invoice', () => {
  it('should be able to new empty invoice or Invoice page will not load', () => {
    new Invoice()
  })

  describe('parsing json data', () => {
    let json = {
      amount: 130000,
      companySlug: 'facebook',
      targetCompany: {
        name: 'Facebook HQ',
        address: '1601 Willow Rd Menlo Park, California',
        taxId: '0100008000007',
        tel: '+1 650-960-1300',
      },
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
      expect(invoice.companySlug).toEqual('facebook')
    })

    it('should have target company name', () => {
      expect(invoice.getTargetCompanyName()).toEqual('Facebook HQ')
    })

    it('should have target company address', () => {
      expect(invoice.getTargetCompanyAddress()).toEqual('1601 Willow Rd Menlo Park, California')
    })

    it('should have target company tax id', () => {
      expect(invoice.getTargetCompanyTaxId()).toEqual('0100008000007')
    })

    it('should have target company telephone number', () => {
      expect(invoice.getTargetCompanyTel()).toEqual('+1 650-960-1300')
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
        expect(item.getTotal()).toEqual('THB 800.00')
      })
    })
    describe('total', () => {
      it('should follow last item', () => {
        let total = invoice.getItems()[2]
        expect(total.name).toEqual('Total')
        expect(total.getTotal()).toEqual('THB 400,800.00')
      })
    })
    describe('tax', () => {
      it('should follow total', () => {
        let tax = invoice.getItems()[3]
        expect(tax.name).toEqual('Tax')
        expect(tax.getTotal()).toEqual('THB 28,056.00')
      })
    })
    describe('grand total', () => {
      it('should follow tax', () => {
        let grandTotal = invoice.getItems()[4]
        expect(grandTotal.name).toEqual('Grand Total')
        expect(grandTotal.getTotal()).toEqual('THB 428,856.00')
      })
    })
  })
})