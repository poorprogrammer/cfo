import Invoice from "../../../src/models/Invoice"
import Receipt from "../../../src/models/Receipt"

describe('Receipt', () => {
  let receipt
  beforeEach(() =>{
    let json = {
      receiptNumber: "202001-001",
      receiptDate: "2020-01-03",
      projectName: "React",
      targetCompany: {
        name: "Facebook HQ",
      },
      payment: "bank transfer"
    }
    receipt = new Receipt(json)
  })

  describe('parsing json data', () => {
    it('should have receipt number', () => {
      expect(receipt.receiptNumber).toEqual('202001-001')
    })
    it('should have payment', () => {
      expect(receipt.payment).toEqual('bank transfer')
    })
  })
  describe('render create receipt page', () => {
    it('should have target company name', () => {
      receipt = new Receipt()
      expect(receipt.targetCompany.name).toEqual('')
    })
    it('should have from company name', () => {
      receipt = new Receipt()
      expect(receipt.fromCompany.name).toEqual('')
    })
    it('should be able to get currencies without errors', () => {
      receipt = new Receipt()
      receipt.getCurrencies()
    })
    it('should have items', () => {
      receipt = new Receipt()
      expect(receipt.items.length).toEqual(0)
    })
    it('should be able to getItems', () => {
      receipt = new Receipt()
      receipt.getItems()
    })
    it('should have invoice number in for a receipt of a single invoice', () => {
      expect(receipt.hasInvoiceNumber).toEqual(true)
    })
  })
  describe('generate receipt from selected invoices', () => {
    let invoices = [
      new Invoice({
        invoiceNumber: '202101-001',
        fromCompany: {
          name: 'from'
        },
        targetCompany: {
          name: 'to'
        },
        items: [
          {name: 'item 1', price: 10, amount: 1},
          {name: 'item 2', price: 2, amount: 1},
        ],
      }),
      new Invoice({
        invoiceNumber: '202101-002',
        items: [
          {name: 'item 3', price: 30, amount: 1},
          {name: 'item 4', price: 4, amount: 1},
        ],
      }),
    ]
    it('should copy from and to from the 1st invoice', () => {
      receipt = Receipt.createFromInvoices(invoices)
      expect(receipt.fromCompany.name).toEqual('from')
      expect(receipt.targetCompany.name).toEqual('to')
    })
    it('should have invoices as items', () => {
      receipt = Receipt.createFromInvoices(invoices)
      expect(receipt.items[0].name).toEqual(invoices[0].invoiceNumber)
      expect(receipt.items[0].price).toEqual(invoices[0].getTotal())
      expect(receipt.items[0].amount).toEqual(1)
    })
    it('should have withholding tax 3%', () => {
      receipt = Receipt.createFromInvoices(invoices)
      let wht = receipt.getItems()[3]
      expect(wht.name).toEqual('WHT 3%')
      expect(wht.t).toEqual(receipt.getTotal() * -0.03)
    })
    it('should have withholding decucted from grand total as the customer would be submitting this tax to the government', () => {
      receipt = Receipt.createFromInvoices(invoices)
      let grandTotal = receipt.getItems()[5]
      expect(grandTotal.name).toEqual('Grand Total')
      expect(grandTotal.t).toEqual(receipt.getTotal() * 1.04)
    })
    it('should have receipt date as today', () => {
      let today = new Date("January 13, 2021")
      receipt = Receipt.createFromInvoices(invoices, today)
      expect(receipt.receiptDate).toEqual('2021-01-13')
    })
    it('should have receipt number', () => {
      let today = new Date("January 13, 2021")
      receipt = Receipt.createFromInvoices(invoices, today)
      expect(receipt.receiptNumber).toEqual('202101-')
    })
  })

  describe('Printing', () => {
    it('should print small items when there are more than 2 items so it fits in 1 page. It was 1 less than invoice because WHT takes a row', () => {
      receipt.addItemBefore()
      receipt.addItemBefore()
      receipt.addItemBefore()
      expect(receipt.items.length).toEqual(3)
      expect(receipt.itemClass()).toEqual("small")
    })
  })
    it('should have small signature class when it has payment info', () => {
      expect(receipt.tablePaddingClass()).toEqual('dense')
    })
    it('should have normal signature class when no payment info', () => {
      receipt.payment = ''
      expect(receipt.tablePaddingClass()).toEqual('')
    })
})