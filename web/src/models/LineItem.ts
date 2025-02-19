import BillingDocument, { LineItemData } from "./BillingDocument";

export default abstract class LineItem implements LineItemData {
  public name: string;
  protected invoice: BillingDocument;

  constructor(name: string, value: number, invoice: BillingDocument) {
    this.name = name;
    this.invoice = invoice;
  }

  abstract getTotal(): string;

  get price(): string {
    return "";
  }

  set price(value: string) {
    // do nothing
  }

  getPrice(): string {
    return "";
  }

  get amount(): string {
    return "";
  }

  set amount(value: string) {
    // do nothing
  }

  getCurrency(n: number): string {
    return this.invoice.currentValueWithCurrency(n);
  }

  total(): number {
    return 0;
  }
}

export class TotalLineItem extends LineItem {
  getTotal(): string {
    return this.getCurrency(this.invoice.getTotal());
  }
}

export class TaxLineItem extends LineItem {
  getTotal(): string {
    return this.getCurrency(this.invoice.getTotal() * 0.07);
  }
}

export class GrandTotalLineItem extends LineItem {
  getTotal(): string {
    return this.getCurrency(this.invoice.getTotal() * 1.07);
  }
}
