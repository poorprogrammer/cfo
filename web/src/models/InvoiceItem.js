export default class InvoiceItem {
  constructor(name, t) {
    this.name = name
    this.t = t
  }
  getTotal() { return InvoiceItem.getCurrency(this.t)}
  static getCurrency(n) { return new Intl.NumberFormat('th-TH', {style: 'currency', currency: 'THB'}).format(n) }
}
