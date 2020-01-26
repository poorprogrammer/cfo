import Invoice from "../../../src/models/Invoice"

describe('Invoice', () => {
  it('should be able to new empty invoice or Invoice page will not load', () => {
    expect(new Invoice()).toEqual(new Invoice())
  })
})