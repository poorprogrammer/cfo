import Invoice from "../../../src/models/Invoice"

describe('Invoice', () => {

  describe('parsing json data', () => {
    let json = {
      amount: 130000,
      projectName: 'React',
      fromCompany: {
        name: 'ODDS HQ',
        address: '69 We are not hiring',
        taxId: '0100000000000',
        tel: '+66896669999',
      },
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

    it('should have from company name', () => {
      expect(invoice.getFromCompanyName()).toEqual('ODDS HQ')
    })

    it('should have from company address', () => {
      expect(invoice.getFromCompanyAddress()).toEqual('69 We are not hiring')
    })

    it('should have from company tax id', () => {
      expect(invoice.getFromCompanyTaxId()).toEqual('0100000000000')
    })

    it('should have from company telephone number', () => {
      expect(invoice.getFromCompanyTel()).toEqual('+66896669999')
    })

    it('should have target company name field for invoice list to use', () => {
      expect(invoice.targetCompany.name).toEqual('Facebook HQ')
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

    it('should have project name field which used in invoice list page', () => {
      expect(invoice.projectName).toEqual('React')
    })

    it('should have items as Array', () => {
      expect(Array.isArray(invoice.getItems())).toEqual(true)
    })

    it('should have duplicattion url', () => {
      expect(invoice.duplicationUrl()).toEqual('/invoice/202001-001/duplicate')
    })

    describe('for each item', () => {
      let item = invoice.getItems()[1]

      it('should have a name', () => {
        expect(item.name).toEqual('Scrum master')
      })

      it('should have a price', () => {
        expect(item.getPrice()).toEqual('THB 80.00')
      })

      it('should have an amount', () => {
        expect(item.amount).toEqual(10)
      })

      it('should have a total', () => {
        expect(item.getTotal()).toEqual('THB 800.00')
      })
    })
    describe('total', () => {
      let total = invoice.getItems()[2]
      it('should follow last item', () => {
        expect(total.name).toEqual('Total')
        expect(total.getTotal()).toEqual('THB 400,800.00')
      })
      it('should have getPrice or the invoice items would not show on the invoice page', () => {
        expect(total.getPrice()).toEqual('')
      })
    })
    describe('vat', () => {
      it('should follow total', () => {
        let vat = invoice.getItems()[3]
        expect(vat.name).toEqual('VAT 7%')
        expect(vat.getTotal()).toEqual('THB 28,056.00')
      })
    })
    describe('grand total', () => {
      it('should follow vat', () => {
        let grandTotal = invoice.getItems()[4]
        expect(grandTotal.name).toEqual('Grand Total')
        expect(grandTotal.getTotal()).toEqual('THB 428,856.00')
      })
    })
  })
})