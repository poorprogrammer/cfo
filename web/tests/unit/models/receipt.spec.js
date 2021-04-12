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
})