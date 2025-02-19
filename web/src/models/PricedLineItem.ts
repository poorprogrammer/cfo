import LineItem from "./LineItem";
import BillingDocument from "./BillingDocument";

export default class PricedLineItem extends LineItem {
  constructor(invoice: BillingDocument, name = "", price = "", amount = "") {
    super(name, 0, invoice);
    this.price = price.toString();
    this.amount = amount.toString();
  }

  override total(): number {
    return this._price * this._amount;
  }

  getTotal(): string {
    if (this.total() === 0) return "";
    return this.getCurrency(this.total());
  }

  getPrice(): string {
    if (this._price === 0) return "";
    return this.getCurrency(this._price);
  }

  protected get _price(): number {
    return PricedLineItem.parseFloat(this.price);
  }

  protected get _amount(): number {
    return PricedLineItem.parseFloat(this.amount);
  }

  static parseFloat(value: string): number {
    return value == "" ? 0 : parseFloat(value);
  }

  static numberToString(value: number): string {
    return value == 0 ? "" : value.toString();
  }
}
