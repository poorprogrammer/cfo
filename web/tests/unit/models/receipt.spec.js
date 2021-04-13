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
    }
    receipt = new Receipt(json)
  })

  describe('parsing json data', () => {
    it('should have receipt number', () => {
      expect(receipt.receiptNumber).toEqual('202001-001')
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
})