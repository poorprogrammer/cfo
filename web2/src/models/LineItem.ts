import BillingDocument from "./BillingDocument";

export interface ILineItem {
  name: string;
}

export default class LineItem implements ILineItem {
  public name: string;
  public t: number;
  protected invoice: BillingDocument;

  constructor(name: string, t: number, invoice: BillingDocument) {
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

  total(): number {
    return this.t;
  }
}
