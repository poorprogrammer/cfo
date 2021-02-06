const Invoices = require('../../fixtures/invoicesData')
const invoiceCreatedMessage = require("../../../src/queue/message");

describe("invoice created", () => {
  it("should have invoice number, company and amount", () => {
    let inv = Invoices["202001-007"];
    let msg = invoiceCreatedMessage(inv)
    expect(msg).toEqual(`202001-007, Facebook HQ, ${20000 * 20 + 80 * 10}`);
  });
});
