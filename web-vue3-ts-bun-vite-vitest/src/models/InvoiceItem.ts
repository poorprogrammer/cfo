export default class InvoiceItem {
  constructor(public name: string, public t: number, public invoice: any) { }

  getTotal() {
    return this.getCurrency(this.t);
  }

  getPrice() {
    return "";
  }

  getCurrency(n: number) {
    return this.currency(this.invoice.currency).format(n);
  }

  currency(key = "THB") {
    return this.invoice.currencies[key];
  }
}
