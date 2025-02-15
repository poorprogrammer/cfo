import { InvoiceListPresenter } from "@/presenters/InvoiceList";
import API from "@/services/InvoiceService";
import Invoice from "../../../src/models/Invoice";
import { ref } from "vue";

describe("PaymentInfoList Presenter", () => {
  let p = new InvoiceListPresenter(undefined, new API());
  describe("invoices", () => {
    describe("when there no invoices", () => {
      it("should be empty list initally or the screen would not render", () => {
        expect([]).toEqual(p.items.value);
      });
    });
  });
  describe("headers", () => {
    it("should contains correct headers", () => {
      expectHeadersToBeCorrect(p.headers);
    });

    it("should keep amount out of invoice list page for privacy", () => {
      p.headers.forEach((header) => {
        expect(Object.values(header)).not.toContain("amount");
      });
    });

    let expectHeadersToBeCorrect = (headers) => {
      expect("Number").toEqual(headers[0].text);
      expect("Company").toEqual(headers[1].text);
      expect("Project").toEqual(headers[2].text);
      expect("Date").toEqual(headers[3].text);
    };
  });
  it("should get invoices from API when init", () => {
    vi.spyOn(p.API, "getAll").mockResolvedValue([]);
    p.init("2021");
    expect(p.API.getAll).toHaveBeenCalledWith("2021");
  });
  it("should remove deleted invoice after API complete", () => {
    p.items = ref([
      new Invoice({
        invoiceNumber: "202101-003",
        deleted: false,
      }),
      new Invoice({
        invoiceNumber: "202101-004",
        deleted: false,
      }),
      new Invoice({
        invoiceNumber: "202101-005",
        deleted: false,
      }),
    ]);

    let deletedInvoice = new Invoice({
      invoiceNumber: "202101-004",
      deleted: true,
    });

    p.removeItemFromList(deletedInvoice);
    expect(p.items.value.length).toEqual(2);
    expect(p.items.value[0].invoiceNumber).toEqual("202101-003");
    expect(p.items.value[1].invoiceNumber).toEqual("202101-005");
  });
});
