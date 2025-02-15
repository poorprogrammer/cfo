import LineItem from "./LineItem";
import BillingDocument from "./BillingDocument";

export default class PricedLineItem extends LineItem {
  _price: number;
  _amount: number;

  constructor(
    invoice: BillingDocument,
    name = "",
    price: number | string = "",
    amount: number | string = ""
  ) {
    super(name, 0, invoice);
    this._price = typeof price === "string" ? 0 : price;
    this._amount = typeof amount === "string" ? 0 : amount;
    this.t = this.total();
  }

  override total(): number {
    return this._price * this._amount;
  }

  getTotal(): string {
    if (this.total() === 0) return "";
    return this.getCurrency(this.total());
  }

  set price(value: number) {
    this._price = value;
    this.t = this.total();
  }

  get price(): number {
    return this._price;
  }

  getPrice(): string {
    if (this._price === 0) return "";
    return this.getCurrency(this._price);
  }

  set amount(value: number) {
    this._amount = value;
    this.t = this.total();
  }

  get amount(): number {
    return this._amount;
  }
}
