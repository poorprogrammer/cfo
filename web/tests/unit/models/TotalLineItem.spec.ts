import Invoice from "@/models/Invoice";
import { TotalLineItem } from "@/models/LineItem";

describe("TotalLineItem", () => {
  test("a user set price without crashing edit page", () => {
    const item = new TotalLineItem("Price for work below:", 100, new Invoice());
    item.price = "200";
    expect(item.price).toEqual(""); // price is not editable
  });
  test("a user set amount without crashing edit page", () => {
    const item = new TotalLineItem("Price for work below:", 100, new Invoice());
    item.amount = 200;
    expect(item.amount).toEqual(0); // amount is not editable
  });
});
