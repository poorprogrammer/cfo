import Presenter from "@/presenters/InvoiceList";

describe("InvoiceList Presenter", () => {
  let p = new Presenter();
  describe("invoices", () => {
    describe("when there no invoices", () => {
      it("should be empty list initally or the screen would not render", () => {
        expect([]).toEqual(p.items);
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
    jest.spyOn(p.API, "getAll");
    p.init(2021);
    expect(p.API.getAll).toHaveBeenCalledWith(2021);
  });
  it("should sort by decending invoice number", () => {
    expect(p.sortBy()).toEqual("invoiceNumber");
    expect(p.sortDesc()).toEqual(true);
  });
  it("should remove deleted invoice after API complete", () => {
    p.items = [
      {
        invoiceNumber: "202101-003",
        deleted: false,
        _id: "3",
      },
      {
        invoiceNumber: "202101-004",
        deleted: false,
        _id: "4",
      },
      {
        invoiceNumber: "202101-005",
        deleted: false,
        _id: "5",
      },
    ];
    let deletedInvoice = {
      invoiceNumber: "202101-004",
      deleted: true,
      _id: "4",
    };
    p.removeItemFromList(deletedInvoice);
    expect(p.items.length).toEqual(2);
    expect(p.items[0].invoiceNumber).toEqual('202101-003');
    expect(p.items[1].invoiceNumber).toEqual('202101-005');
  });
});
