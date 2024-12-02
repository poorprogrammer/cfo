import InvoiceItem from "@/models/InvoiceItem";
import PaymentInformation from "./PaymentInformation";

export default class PricedInvoiceItem {
  name: string;
  price: number;
  amount: number;
  item: InvoiceItem;

  constructor(
    invoice: PaymentInformation,
    name = "",
    price: number | string = "",
    amount: number | string = ""
  ) {
    this.name = name;
    this.price = typeof price === "string" ? 0 : price;
    this.amount = typeof amount === "string" ? 0 : amount;
    this.item = new InvoiceItem(name, 0, invoice);
  }

  total(): number {
    return this.price * this.amount;
  }

  getTotal(): string {
    if (this.total() === 0) return "";
    return this.item.getCurrency(this.total());
  }

  //   get price(): string {
  //     return `${this.price}`;
  //   }

  getPrice(): string {
    if (this.price === 0) return "";
    return this.item.getCurrency(this.price);
  }

  get t(): number {
    return this.total();
  }
}
