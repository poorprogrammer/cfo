import Presenter from "@/presenters/InvoiceList";

describe("InvoiceList Presenter", () => {
  let p;
  describe("generate receipt from invoices", () => {
    beforeEach(() => {
      p = new Presenter()
    })
    it("should change button color after toggle generate receipt mode", () => {
      p.toggleGenerateReceipt()
      expect(p.buttonColor).toEqual('purple')
    });
    it("should have primary color by default", () => {
      expect(p.buttonColor).toEqual('primary')
    });
    it("should change button color back to primary after exit generate receipt mode", () => {
      p.toggleGenerateReceipt()
      p.toggleGenerateReceipt()
      expect(p.buttonColor).toEqual('primary')
    });
  });
});
