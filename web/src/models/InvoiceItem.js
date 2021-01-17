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
    let currencies = {
      "THB": new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', currencyDisplay: 'code' }),
      "USD": new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD', currencyDisplay: 'code' }),
    }
    return currencies[key]
  }

}
