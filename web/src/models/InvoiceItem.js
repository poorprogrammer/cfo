export default class InvoiceItem {
  constructor(data) {
    this.name = data.name
    this.price = data.price
    this.amount = data.amount
  }
  total() {
    return this.price * this.amount
  }
  getTotal() {
    return new Intl.NumberFormat('th-TH', {style: 'currency', currency: 'THB'}).format(this.total())
  }
}
