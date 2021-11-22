const Invoice = require("../../../src/services/invoice");
const Sender = require("../../../src/queue/sender");
const MockDatabase = require("./MockDatabase");

class MockSender {
  send(queue, msg) {}
}

describe("invoice", () => {
  let service, db;
  beforeEach(() => {
    db = new MockDatabase();
    service = new Invoice(db, new MockSender());
  });
  describe("save", () => {
    it("should return invoice number", () => {
      let inv = { invoiceNumber: "202001-001" };
      service.save(inv).then((invoiceNumber) => {
        expect(invoiceNumber).toEqual("202001-001");
      });
    });
  });
  describe("update", () => {
    it("should return updated invoice", () => {
      let inv = {
        id: 1,
        invoiceNumber: "202001-001",
        items: [{ name: "training" }],
      };
      db.mockUpdate(inv);

      service.update(inv).then((invoice) => {
        expect(invoice.invoiceNumber).toEqual("202001-001");
        expect(invoice.items[0].name).toEqual("training");
      });
    });
    it("should update with id", () => {
      let id = 1;
      let invoice = {
        id: id,
        invoiceNumber: "202001-008",
      };
      db.mockUpdate(invoice);

      service.update(invoice);

      expect(db.update).toHaveBeenCalledWith({ _id: id }, invoice);
    });
  });
  describe("all", () => {
    it("should return an array", () => {
      service.all().then((invoices) => {
        expect(invoices.length).toBe(7);
      });
    });
    it("should exclude deleted invoices", () => {
      db.mockAll();
      service.all();
      expect(db.find).toHaveBeenCalledWith({
        deleted: { $ne: true },
        invoiceDate: /(?:)/,
      });
    });
  });
  describe("get", () => {
    var inv;
    beforeEach(() => {
      service.get("202001-007").then((invoice) => {
        inv = invoice;
      });
    });
    it("should have invoiceNumber", () => {
      expect(inv.invoiceNumber).toBe("202001-007");
    });
    it("should have target company name", () => {
      expect(inv.targetCompany.name).toBe("Facebook HQ");
    });
    it("should have target company address", () => {
      var expected = "1601 Willow Rd Menlo Park, California";
      expect(inv.targetCompany.address).toBe(expected);
    });
    it("should have target company tax id", () => {
      expect(inv.targetCompany.taxId).toBe("0100008000007");
    });
    it("should have target company telephone number", () => {
      expect(inv.targetCompany.tel).toBe("+1 650-960-1300");
    });
    it("should have from company name", () => {
      expect(inv.fromCompany.name).toBe("ODDS HQ");
    });
    it("should have from company address", () => {
      expect(inv.fromCompany.address).toBe("69 We are not hiring");
    });
    it("should have from company tax id", () => {
      expect(inv.fromCompany.taxId).toBe("0100000000000");
    });
    it("should have from company telephone number", () => {
      expect(inv.fromCompany.tel).toBe("+66896669999");
    });
    it("should have project name", () => {
      expect(inv.projectName).toBe("React");
    });
  });
});
