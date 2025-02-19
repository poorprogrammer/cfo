import Invoice from "@/models/Invoice";
import { TotalLineItem } from "@/models/LineItem";

describe("TotalLineItem", () => {
  test("a user set price without crashing edit page", () => {
    const item = new TotalLineItem("Price for work below:", 100, new Invoice());
    try {
      item.price = "200";
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });
  test("a user set amount without crashing edit page", () => {
    const item = new TotalLineItem("Price for work below:", 100, new Invoice());
    try {
      item.amount = "200";
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });
});
