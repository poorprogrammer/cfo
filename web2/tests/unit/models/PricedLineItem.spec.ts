import Invoice from "@/models/Invoice";
import PricedLineItem from "@/models/PricedLineItem";

describe("note as item", () => {
  const item = new PricedLineItem(
    new Invoice(),
    "Price for work below:",
    "",
    0
  );
  it("should have no prices", () => {
    expect(item.getPrice()).toEqual("");
  });
  it("should have no total", () => {
    expect(item.getTotal()).toEqual("");
  });
});
