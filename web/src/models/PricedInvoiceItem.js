import InvoiceItem from '@/models/InvoiceItem'

export default class PricedInvoiceItem {
  constructor(name="", price="", amount="") {
    this.name = name
    this.price = price
    this.amount = amount
    this.key = Math.random()
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
