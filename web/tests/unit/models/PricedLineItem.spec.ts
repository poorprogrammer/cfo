import Invoice from "@/models/Invoice";
import PricedLineItem from "@/models/PricedLineItem";

describe("PricedLineItem", () => {
  let item: PricedLineItem;
  it("can calculate total", () => {
    item = new PricedLineItem(new Invoice(), "Developer", "1000", "10");
    expect(item.price).toEqual("1000");
    expect(item.amount).toEqual("10");
    expect(item.getTotal()).toEqual("THB 10,000.00");
  });
  it("support floating point", () => {
    item = new PricedLineItem(new Invoice(), "Developer", "1000.5", "1.5");
    expect(item.price).toEqual("1000.5");
    expect(item.amount).toEqual("1.5");
    expect(item.getTotal()).toEqual("THB 1,500.75");
  });
  describe("note as item", () => {
    beforeEach(() => {
      item = new PricedLineItem(
        new Invoice(),
        "Price for work below:",
        "",
        "0"
      );
    });
    it("should have no prices", () => {
      expect(item.price).toEqual("");
    });
    it("should have no amounts", () => {
      expect(item.amount).toEqual("");
    });
    it("should have no total", () => {
      expect(item.getTotal()).toEqual("");
    });
  });
});
