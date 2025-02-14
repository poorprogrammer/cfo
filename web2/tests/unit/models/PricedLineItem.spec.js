import PricedLineItem from "../../../src/models/PricedLineItem";

describe("note as item", () => {
  let item = new PricedLineItem("Price for work below:", "", 0);
  it("should have no prices", () => {
    expect(item.getPrice()).toEqual("");
  });
  it("should have no total", () => {
    expect(item.getTotal()).toEqual("");
  });
});
