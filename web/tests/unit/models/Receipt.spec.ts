import Invoice from "../../../src/models/Invoice";
import Receipt, { ReceiptData } from "../../../src/models/Receipt";

describe("Receipt/Tax Invoice", () => {
  let receipt: Receipt;
  beforeEach(() => {
    const json = {
      receiptNumber: "202001-001",
      receiptDate: "2020-01-03",
      projectName: "React",
      targetCompany: {
        name: "Facebook HQ",
      },
      _wht: { name: "WHT 3%", price: "-515", amount: 1 },
    };
    receipt = new Receipt(json);
  });

  describe("parsing json data", () => {
    it("should have receipt number", () => {
      expect(receipt.receiptNumber).toEqual("202001-001");
    });
  });
  describe("render create receipt page", () => {
    it("should have Tax Invoice in title so it can also be used as tax invoice", () => {
      const titles = new Receipt().getTitles();
      expect(titles[0].title).toEqual("Receipt/Tax Invoice (original)");
    });
    it("should have copy", () => {
      const titles = new Receipt().getTitles();
      expect(titles[1].title).toEqual("Receipt/Tax Invoice (copy)");
    });
    it("should have target company name", () => {
      receipt = new Receipt();
      expect(receipt.targetCompany.name).toEqual("");
    });
    it("should have from company name", () => {
      receipt = new Receipt();
      expect(receipt.fromCompany.name).toEqual("");
    });
    it("should be able to get currencies without errors", () => {
      receipt = new Receipt();
      receipt.getCurrencies();
    });
    it("should have items", () => {
      receipt = new Receipt();
      expect(receipt.items.length).toEqual(0);
    });
    it("should be able to getItems", () => {
      receipt = new Receipt();
      receipt.getItems();
    });
    it("should have invoice number in for a receipt of a single invoice", () => {
      expect(receipt.hasInvoiceNumber).toEqual(true);
    });
  });
  describe("generate receipt from selected invoices", () => {
    let receipt: ReceiptData;
    const invoices = [
      new Invoice({
        invoiceNumber: "I202101-001",
        fromCompany: {
          name: "from",
        },
        targetCompany: {
          name: "to",
        },
        items: [
          { name: "item 1", price: "10", amount: "1" },
          { name: "item 2", price: "20", amount: "1" },
        ],
      }),
      new Invoice({
        invoiceNumber: "202101-002",
        items: [
          { name: "item 3", price: "30", amount: "1" },
          { name: "item 4", price: "40", amount: "1" },
        ],
      }),
    ];
    it("should copy from and to from the 1st invoice", () => {
      receipt = Receipt.createFromInvoices(invoices);
      expect(receipt.fromCompany?.name).toEqual("from");
      expect(receipt.targetCompany?.name).toEqual("to");
    });
    it("should have invoices as items", () => {
      receipt = Receipt.createFromInvoices(invoices);
      expect(receipt.items?.[0].name).toEqual(invoices[0].invoiceNumber);
      expect(receipt.items?.[0].price).toEqual(
        invoices[0].getTotal().toString()
      );
      expect(receipt.items?.[0].amount).toEqual("1");
    });
    it("should have receipt date as today", () => {
      const today = new Date("January 13, 2021");
      receipt = Receipt.createFromInvoices(invoices, today);
      expect(receipt.receiptDate).toEqual("2021-01-13");
    });
    it("should have receipt number", () => {
      const today = new Date("January 13, 2021");
      receipt = Receipt.createFromInvoices(invoices, today);
      expect(receipt.receiptNumber).toEqual("R202101-");
    });
    it("should be able to serialize to query string", () => {
      receipt = Receipt.createFromInvoices(invoices);
      expect(JSON.stringify(receipt)).toContain("I202101-001");
    });
  });
});
