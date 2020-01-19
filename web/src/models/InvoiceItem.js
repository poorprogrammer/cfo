export default class InvoiceItem {
  constructor(data) {
    this.name = data.name
    this.price = data.price
    this.amount = data.amount
  }
  total() {
    return this.price * this.amount
  }
}
