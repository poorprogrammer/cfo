const Invoices = require('../../fixtures/invoicesData')
const Quotations = require('../../fixtures/quotationsData')
const m = require("../../../src/queue/message");

describe("invoice created", () => {
  it("should have invoice number, company and total", () => {
    let inv = Invoices["202001-007"];
    let msg = m.invoiceCreatedMessage(inv)
    expect(msg).toEqual(`I202001-007| Facebook HQ| THB 400,800.00`);
  });
  it("should have total 0 for invoice with no items", () => {
    let inv = Invoices["202001-002"];
    let msg = m.invoiceCreatedMessage(inv)
    expect(msg).toEqual(`I202001-002| Googleplex| THB 0.00`);
  });
  it("should support USD", () => {
    let inv = Invoices["202001-001"];
    let msg = m.invoiceCreatedMessage(inv)
    expect(msg).toEqual(`I202001-001| SPACEX HEADQUARTERS| USD 14,950.00`);
  });
});

describe("quotation created", () => {
  it("should have quotation number, company and total", () => {
    let q = Quotations["202001-001"];
    let msg = m.quotationCreatedMessage(q)
    expect(msg).toEqual(`Q202001-001| SPACEX HEADQUARTERS| USD 14,950.00`);
  });
});