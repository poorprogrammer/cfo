import Invoice from "../../../src/models/Invoice"
import { Factory } from "../factory"

describe('Invoice', () => {
  let invoice = Factory.createInvoice()

  describe('parsing json data', () => {
    it('should have id', () => {
      expect(invoice.id).toEqual('oRFlyXTZX9cV6hIS')
    })

    it('should have invoiceNumber', () => {
      expect(invoice.invoiceNumber).toEqual('202001-001')
    })

    it('should have quotation number', () => {
      expect(invoice.quotationNumber).toEqual('201912-060')
    })

    it('should not have receipt number', () => {
      expect(invoice.hasReceiptNumber).toEqual(false)
    })

    it('should have purchase order number', () => {
      expect(invoice.purchaseOrderNumber).toEqual('PO 20034910343')
    })

    it('should have remark', () => {
      expect(invoice.remark).toEqual('Dec 2019')
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

    it('should use saved currency so that item price and total is shown correctly', () => {
      let data = Object.assign({}, Factory.json)
      data.currency = 'USD'
      let invoice = new Invoice(data)
      expect(invoice.currency).toEqual('USD')
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

      it('should have key for v-for to loop on', () => {
        console.log(item)
        expect(typeof(item.key)).toEqual('number')
      })

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

  describe('Printing', () => {
    it('should print small items when there are more than 3 items so it fits in 1 page', () => {
      invoice.addItemBefore()
      invoice.addItemBefore()
      expect(invoice.items.length).toEqual(4)
      expect(invoice.itemClass()).toEqual("small")
    })
    it('should make company name small when the name is too long', () => {
      let invoice = Factory.createInvoice()
      invoice.targetCompany.name = 'ตลาดหลักทรัพย์แห่งประเทศไทย (สำนักงานใหญ่)'
      expect(invoice.targetCompanyNameClass()).toEqual('small')
    })
    it('should not make company name small when the name normal', () => {
      let invoice = Factory.createInvoice()
      invoice.targetCompany.name = '*3*5*7*10*13*16*19*22*25*28'
      expect(invoice.targetCompanyNameClass()).toEqual('')
    })
    it('invoice should have original', () => {
      let titles = invoice.getTitles();
      expect(titles[0].title).toEqual('Invoice (original)')
    })
    it('original invoice displays on screen and paper', () => {
      let titles = invoice.getTitles();
      expect(titles[0].css).toEqual('')
    })
    it('invoice should have copy', () => {
      let titles = invoice.getTitles();
      expect(titles[1].title).toEqual('Invoice (copy)')
    })
    it('copy invoice displays paper only', () => {
      let titles = invoice.getTitles();
      expect(titles[1].css).toEqual('print-only')
    })
    it('should have filename to be save when export to PDF and store in storage', () => {
      expect(invoice.filename()).toEqual('001-012020_INVOICE_Facebook HQ_React')
    })
  })

  describe('switching currency', () => {
    let item

    beforeEach(() =>{
      invoice = Factory.createInvoice()
      item = invoice.getItems()[1]
    })

    it('should support THB and USD', () => {
      expect(invoice.getCurrencies()).toContain('THB')
      expect(invoice.getCurrencies()).toContain('USD')
    })

    it('should have a price in USD', () => {
      invoice.currency = 'USD'
      expect(item.getPrice()).toEqual('USD 80.00')
      expect(item.getTotal()).toEqual('USD 800.00')
    })
  })

  describe('list invoice', () => {
    it('should have number expeced by presenter', () => {
      expect(invoice.number).toEqual('202001-001')
    })
    it('should have date expeced by presenter', () => {
      expect(invoice.date).toEqual('2020-01-03')
    })
  })

  describe('Update duplicated invoice', () => {
    it('should be able to change from company name', () => {
      invoice.fromCompany.name = 'ODDSTria'
      expect(invoice.getFromCompanyName()).toEqual('ODDSTria')
    })
    it('should be able to change from company address', () => {
      invoice.fromCompany.address = 'new address'
      expect(invoice.getFromCompanyAddress()).toEqual('new address')
    })
    it('should be able to change from company tax id', () => {
      invoice.fromCompany.taxId = 'new taxId'
      expect(invoice.getFromCompanyTaxId()).toEqual('new taxId')
    })
    it('should be able to change from company tel', () => {
      invoice.fromCompany.tel = 'new tel'
      expect(invoice.getFromCompanyTel()).toEqual('new tel')
    })
    it('should be able to change target company name', () => {
      invoice.targetCompany.name = 'ODDSTria'
      expect(invoice.getFromCompanyName()).toEqual('ODDSTria')
    })
    it('should be able to change target company address', () => {
      invoice.targetCompany.address = 'new address'
      expect(invoice.getFromCompanyAddress()).toEqual('new address')
    })
    it('should be able to change target company tax id', () => {
      invoice.targetCompany.taxId = 'new taxId'
      expect(invoice.getFromCompanyTaxId()).toEqual('new taxId')
    })
    it('should be able to change target company tel', () => {
      invoice.targetCompany.tel = 'new tel'
      expect(invoice.getFromCompanyTel()).toEqual('new tel')
    })
    it('should be able to change invoice number', () => {
      invoice.invoiceNumber = 'new number'
      expect(invoice.invoiceNumber).toEqual('new number')
    })
    it('should be able to change invoice date', () => {
      invoice.invoiceDate = 'new date'
      expect(invoice.invoiceDate).toEqual('new date')
    })
    it('should be able to set invoice date to today', () => {
      let today = new Date("January 13, 2021")
      invoice.invoiceDate = '2021-01-02'
      invoice.setDateToday(today)
      expect(invoice.invoiceDate).toEqual('2021-01-13')
    })
    it('should be able to change project', () => {
      invoice.projectName = 'new project'
      expect(invoice.getProjectName()).toEqual('new project')
    })
    it('should show invoice number, invoice date and PO field to edit', () => {
      expect(invoice.hasInvoiceNumber).toEqual(true)
    })
    describe("add and remove item", () => {
      beforeEach(() =>{
        invoice = Factory.createInvoice()
      })
      it('add should increase total length', () => {
        invoice.addItemBefore(invoice.items[0])
        expect(invoice.items.length).toEqual(3)
      })
      it('new item is added before the given item', () => {
        invoice.addItemBefore(invoice.items[0])
        expect(invoice.getItems()[0].name).toEqual('')
        expect(invoice.getItems()[0].price).toEqual('')
        expect(invoice.getItems()[0].amount).toEqual('')
      })
      it('new item can get price or adding would fail to render', () => {
        invoice.addItemBefore(invoice.items[0])
        expect(invoice.getItems()[0].getPrice()).toEqual('')
      })
      it('add last item when click on add before total', () => {
        invoice.addItemBefore()
        expect(invoice.getItems()[2].name).toEqual('')
        expect(invoice.getItems()[2].price).toEqual('')
        expect(invoice.getItems()[2].amount).toEqual('')
      })
      it('remove should decrease total length', () => {
        invoice.removeItem(invoice.items[0])
        expect(invoice.items.length).toEqual(1)
      })
      it('remove then the next item is moved up', () => {
        invoice.removeItem(invoice.items[0])
        expect(invoice.getItems()[0].name).toEqual('Scrum master')
      })
      it('remove unknown item does nothing', () => {
        invoice.removeItem()
        expect(invoice.items.length).toEqual(2)
      })
    })
  })

  describe("delete invoice", () => {
    let invoice
    beforeEach(() =>{
      invoice = Factory.createInvoice()
    })
    it('should mark as deleted', () => {
      invoice.markAsDeleted()
      expect(invoice.deleted).toEqual(true)
    })
    it('should update invoice number so the invoice number can be reused while unique', () => {
      let t = '1610194022999'
      mockCurrentTimestamp(invoice, t)
      invoice.invoiceNumber = '202001-008'

      invoice.markAsDeleted()

      expect(invoice.invoiceNumber).toEqual(`202001-008-cancelled-${t}`)
    })
  })
})
function mockCurrentTimestamp(invoice, timestamp) {
  jest.spyOn(invoice, 'currentTimestamp').mockReturnValue(timestamp)
}