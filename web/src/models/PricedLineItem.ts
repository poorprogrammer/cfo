import LineItem from "./LineItem";
import BillingDocument from "./BillingDocument";

export default class PricedLineItem extends LineItem {
  _price = 0;
  _amount = 0;

  constructor(invoice: BillingDocument, name = "", price = "", amount = "") {
    super(name, 0, invoice);
    this.price = price;
    this.amount = amount;
  }

  override total(): number {
    return this._price * this._amount;
  }

  getTotal(): string {
    if (this.total() === 0) return "";
    return this.getCurrency(this.total());
  }

  set price(value: string) {
    this._price = value == "" ? 0 : parseFloat(value);
  }

  get price(): string {
    return this._price == 0 ? "" : this._price.toString();
  }

  getPrice(): string {
    if (this._price === 0) return "";
    return this.getCurrency(this._price);
  }

  set amount(value: string) {
    this._amount = value == "" ? 0 : parseFloat(value);
  }

  get amount(): string {
    return this._amount == 0 ? "" : this._amount.toString();
  }
}
