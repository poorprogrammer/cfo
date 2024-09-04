import InvoicePresenter from "@/presenters/Invoice";
import API from "@/services/InvoiceService";
import { describe, beforeEach, it, vi, expect } from "vitest";

class MockView {
  goTo() { }
}

describe("Invoice Presenter", () => {
  let invoiceNumber, invoicePresenter;
  beforeEach(() => {
    invoicePresenter = new InvoicePresenter(new MockView(), new API());
    invoiceNumber = "202001-001";
    window.alert = () => { };
  });

  it("should get invoice with specific number from API when init", () => {
    vi.spyOn(invoicePresenter.API, "get").mockResolvedValueOnce("ok");
    invoicePresenter.init(invoiceNumber);
    expectToBeCalledWith(invoicePresenter.API, invoiceNumber);
  });

  it("should save the current invoice", () => {
    vi.spyOn(invoicePresenter.API, "save").mockResolvedValueOnce("ok");
    invoicePresenter.invoice.invoiceNumber = invoiceNumber;
    invoicePresenter.save();
    expect(invoicePresenter.API.save).toHaveBeenCalledWith(invoicePresenter.invoice);
  });

  it("should redirect to view page after save new invoice so it is ready to be printed", async () => {
    givenSaveSuccessWithInvoiceNumber(invoiceNumber);
    await invoicePresenter.save();
    expectToRedirectToViewInvoicePage(invoicePresenter.view, invoiceNumber);
  });

  it("should show error after save duplicated invoice", async () => {
    givenSaveFailedWithError("Error: Request failed with status code 500");
    await invoicePresenter.save();
    expectPopupShownWithError("Error: Request failed with status code 500");
  });

  function givenSaveSuccessWithInvoiceNumber(invoiceNumber) {
    vi.spyOn(invoicePresenter.view, "goTo");
    vi.spyOn(invoicePresenter.API, "save").mockResolvedValue(invoiceNumber);
  }

  function givenSaveFailedWithError(err) {
    vi.spyOn(invoicePresenter, "showError").mockImplementation();
    vi.spyOn(invoicePresenter.API, "save").mockRejectedValue(err);
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
    expect(invoicePresenter.showError).toHaveBeenCalledWith(error);
  }
});
