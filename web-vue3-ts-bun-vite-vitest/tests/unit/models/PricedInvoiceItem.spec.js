import PricedInvoiceItem from "../../../src/models/PricedInvoiceItem";
import { describe, it, expect } from "vitest";

describe("note as item", () => {
  let item = new PricedInvoiceItem("Price for work below:", "", 0);
  it("should have no prices", () => {
    expect(item.getPrice()).toEqual("");
  });
  it("should have no total", () => {
    expect(item.getTotal()).toEqual("");
  });
});
