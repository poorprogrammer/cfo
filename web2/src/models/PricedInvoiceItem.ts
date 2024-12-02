import InvoiceItem from "@/models/InvoiceItem";
import PaymentInformation from "./PaymentInformation";

export default class PricedInvoiceItem {
  name: string;
  _price: number;
  amount: number;
  item: InvoiceItem;

  constructor(
    invoice: PaymentInformation,
    name = "",
    price: number | string = "",
    amount: number | string = ""
  ) {
    this.name = name;
    this._price = typeof price === "string" ? 0 : price;
    this.amount = typeof amount === "string" ? 0 : amount;
    this.item = new InvoiceItem(name, 0, invoice);
  }

  total(): number {
    return this._price * this.amount;
  }

  getTotal(): string {
    if (this.total() === 0) return "";
    return this.item.getCurrency(this.total());
  }

  set price(value: string) {
    this._price = parseFloat(value);
  }

  get price(): number {
    return this._price;
  }

  getPrice(): string {
    if (this._price === 0) return "";
    return this.item.getCurrency(this._price);
  }

  get t(): number {
    return this.total();
  }
}
