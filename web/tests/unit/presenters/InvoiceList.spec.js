import Presenter from "@/presenters/InvoiceList";
import Invoice from "../../../src/models/Invoice";

describe("InvoiceList Presenter", () => {
  let p;
  describe("generate receipt from invoices", () => {
    beforeEach(() => {
      p = new Presenter(new MockView());
    });
    it("should change button color after toggle generate receipt mode", () => {
      p.toggleGenerateReceipt();
      expect(p.buttonColor).toEqual("purple");
    });
    it("should have primary color by default", () => {
      expect(p.buttonColor).toEqual("primary");
    });
    it("should change button color back to primary after confirm generating a receipt", () => {
      p.toggleGenerateReceipt();
      p.toggleGenerateReceipt();
      expect(p.buttonColor).toEqual("primary");
    });
    it("should redirect to create receipt page after confirm generating a receipt", async () => {
      let selectedInvoices = [
        new Invoice({ invoiceNumber: "202101-001" }),
        new Invoice({ invoiceNumber: "202101-002" }),
      ];
      givenGenerateReceiptWith2Invoices(selectedInvoices);

      p.toggleGenerateReceipt();

      expectToRedirectToCreateReceiptPage(p.view, selectedInvoices);
    });
    function givenGenerateReceiptWith2Invoices(selectedInvoices) {
      p.toggleGenerateReceipt();
      p.selectedInvoices = selectedInvoices;
      jest.spyOn(p.view, "goTo");
    }
    function expectToRedirectToCreateReceiptPage(view, selectedInvoices) {
      expect(view.goTo).toHaveBeenCalledWith({
        name: "createReceipt",
        params: { invoices: selectedInvoices },
      });
    }
  });
});

class MockView {
  goTo() {}
}
