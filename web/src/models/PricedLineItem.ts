import LineItem from "./LineItem";
import BillingDocument from "./BillingDocument";

export default class PricedLineItem extends LineItem {
  _price: number;
  _amount: number;

  constructor(invoice: BillingDocument, name = "", price = "", amount: number) {
    super(name, 0, invoice);
    this._price = price == "" ? 0 : parseInt(price);
    this._amount = amount;
    this.value = this.total();
  }

  override total(): number {
    return this._price * this._amount;
  }

  getTotal(): string {
    if (this.total() === 0) return "";
    return this.getCurrency(this.total());
  }

  set price(value: string) {
    this._price = value == "" ? 0 : parseInt(value);
    this.value = this.total();
  }

  get price(): string {
    return this._price == 0 ? "" : this._price.toString();
  }

  getPrice(): string {
    if (this._price === 0) return "";
    return this.getCurrency(this._price);
  }

  set amount(value: number) {
    this._amount = value;
    this.value = this.total();
  }

  get amount(): number {
    return this._amount;
  }
}
