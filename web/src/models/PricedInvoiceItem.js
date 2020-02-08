import InvoiceItem from '@/models/InvoiceItem'

export default class PricedInvoiceItem {
  constructor(data) {
    this.name = data.name
    this.price = data.price
    this.amount = data.amount
  }
  total() {
    return this.price * this.amount
  }
  getTotal() {
    return InvoiceItem.getCurrency(this.total())
  }
  getPrice() {
    return InvoiceItem.getCurrency(this.price)
  }
}
