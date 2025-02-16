import BillingDocument from "@/models/BillingDocument";
import Presenter from "@/presenters/BillingDocumentPresenter";
import API from "@/services/InvoiceService";
import { Mock, vi } from "vitest";

export class MockView {
  goTo() {
    return;
  }
}

describe("Invoice Presenter", () => {
  let invoiceNumber: string;
  let p: Presenter;

  beforeEach(() => {
    p = new Presenter(new MockView(), new API());
    invoiceNumber = "202001-001";
  });

  it("should get invoice with specific number from API when init", () => {
    vi.spyOn(p.API, "get").mockResolvedValue({} as BillingDocument);
    p.init(invoiceNumber);
    expectToBeCalledWith(p.API.get as Mock, invoiceNumber);
  });
  it("should save the current invoice", () => {
    const invoiceNumber = "202001-001";
    vi.spyOn(p.API, "save").mockResolvedValueOnce("ok");
    p.billingDocument.value.number = invoiceNumber;
    p.save();
    expect(p.API.save).toHaveBeenCalledWith(p.billingDocument.value);
  });
  it("should redirect to view page after save new invoice so it is ready to be printed", async () => {
    givenSaveSuccessWithInvoiceNumber(invoiceNumber);
    await p.save();
    expectToRedirectToViewInvoicePage(p.view as MockView, invoiceNumber);
  });
  it("should show error after save duplicated invoice", async () => {
    givenSaveFailedWithError("Error: Request failed with status code 500");
    await p.save();
    expectPopupShownWithError("Error: Request failed with status code 500");
  });
  it("should redirect to view page after update existing invoice so it is ready to be printed", async () => {
    givenUpdateSuccessWithInvoiceNumber(invoiceNumber);
    await p.update();
    expectToRedirectToViewInvoicePage(p.view as MockView, invoiceNumber);
  });
  function givenSaveSuccessWithInvoiceNumber(invoiceNumber: string) {
    vi.spyOn(p.view, "goTo");
    vi.spyOn(p.API, "save").mockResolvedValue(invoiceNumber);
  }
  function givenUpdateSuccessWithInvoiceNumber(invoiceNumber: string) {
    vi.spyOn(p.view, "goTo");
    vi.spyOn(p.API, "update").mockResolvedValue({
      number: invoiceNumber,
    } as BillingDocument);
  }
  function givenSaveFailedWithError(err: string) {
    vi.spyOn(p, "showError").mockImplementation(vi.fn());
    vi.spyOn(p.API, "save").mockRejectedValue(err);
  }
  function expectToBeCalledWith(get: Mock, invoiceNumber: string) {
    expect(get).toHaveBeenCalled();
    expect(get.mock.calls[0][0]).toEqual(invoiceNumber);
  }
  function expectToRedirectToViewInvoicePage(
    view: MockView,
    invoiceNumber: string
  ) {
    expect(view.goTo).toHaveBeenCalledWith({
      name: "invoice",
      params: { number: invoiceNumber },
    });
  }
  function expectPopupShownWithError(error: string) {
    expect(p.showError).toHaveBeenCalledWith(error);
  }
});
