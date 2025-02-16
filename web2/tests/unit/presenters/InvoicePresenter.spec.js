import Presenter from "@/presenters/BillingDocumentPresenter";
import API from "@/services/InvoiceService";

export class MockView {
  goTo() {
    return;
  }
}

describe("Invoice Presenter", () => {
  let invoiceNumber, p;
  beforeEach(() => {
    p = new Presenter(new MockView(), new API());
    invoiceNumber = "202001-001";
  });

  it("should get invoice with specific number from API when init", () => {
    vi.spyOn(p.API, "get").mockResolvedValue({ data: {} });
    p.init(invoiceNumber);
    expectToBeCalledWith(p.API, invoiceNumber);
  });
  it("should save the current invoice", () => {
    const invoiceNumber = "202001-001";
    vi.spyOn(p.API, "save").mockResolvedValueOnce("ok");
    p.billingDocument.value.invoiceNumber = invoiceNumber;
    p.save();
    expect(p.API.save).toHaveBeenCalledWith(p.billingDocument.value);
  });
  it("should redirect to view page after save new invoice so it is ready to be printed", async () => {
    givenSaveSuccessWithInvoiceNumber(invoiceNumber);
    await p.save();
    expectToRedirectToViewInvoicePage(p.view, invoiceNumber);
  });
  it("should show error after save duplicated invoice", async () => {
    givenSaveFailedWithError("Error: Request failed with status code 500");
    await p.save();
    expectPopupShownWithError("Error: Request failed with status code 500");
  });
  it("should redirect to view page after update existing invoice so it is ready to be printed", async () => {
    givenUpdateSuccessWithInvoiceNumber(invoiceNumber);
    await p.update();
    expectToRedirectToViewInvoicePage(p.view, invoiceNumber);
  });
  function givenSaveSuccessWithInvoiceNumber(invoiceNumber) {
    vi.spyOn(p.view, "goTo");
    vi.spyOn(p.API, "save").mockResolvedValue(invoiceNumber);
  }
  function givenUpdateSuccessWithInvoiceNumber(invoiceNumber) {
    vi.spyOn(p.view, "goTo");
    vi.spyOn(p.API, "update").mockResolvedValue({ number: invoiceNumber });
  }
  function givenSaveFailedWithError(err) {
    vi.spyOn(p, "showError").mockImplementation();
    vi.spyOn(p.API, "save").mockRejectedValue(err);
  }
  function expectToBeCalledWith(api, invoiceNumber) {
    expect(api.get).toHaveBeenCalled();
    expect(api.get.mock.calls[0][0]).toEqual(invoiceNumber);
  }
  function expectToRedirectToViewInvoicePage(view, invoiceNumber) {
    expect(view.goTo).toHaveBeenCalledWith({
      name: "invoice",
      params: { number: invoiceNumber },
    });
  }
  function expectPopupShownWithError(error) {
    expect(p.showError).toHaveBeenCalledWith(error);
  }
});
