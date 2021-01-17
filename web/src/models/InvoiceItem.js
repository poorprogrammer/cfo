export default class InvoiceItem {

  constructor(name, t, invoice) {
    this.name = name
    this.t = t
    this.invoice = invoice
  }

  getTotal() {
    return this.getCurrency(this.t)
  }

  getPrice() {
    return ''
  }

  getCurrency(n) {
    return this.currency(this.invoice.currency).format(n)
  }

  currency(key='THB') {
    return this.invoice.currencies[key]
  }

}
