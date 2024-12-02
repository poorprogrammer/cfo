import PaymentInformation from "./PaymentInformation";

export default class InvoiceItem {
  protected name: string;
  protected t: number;
  protected invoice: PaymentInformation;

  constructor(name: string, t: number, invoice: PaymentInformation) {
    this.name = name;
    this.t = t;
    this.invoice = invoice;
  }

  getTotal(): string {
    return this.getCurrency(this.t);
  }

  get price(): string {
    return "";
  }

  getPrice(): string {
    return "";
  }

  getCurrency(n: number): string {
    return this.currency(this.invoice.currency).format(n);
  }

  currency(key = "THB"): Intl.NumberFormat {
    return this.invoice.currencies[key];
  }
}
