import InvoiceItem from '@/models/InvoiceItem'

export default class PricedInvoiceItem {
  constructor(invoice, name="", price="", amount="") {
    this.name = name
    this.price = price
    this.amount = amount
    this.item = new InvoiceItem(name,0,invoice)
    this.key = Math.random()
  }
  total() {
    return this.price * this.amount
  }
  getTotal() {
    return this.item.getCurrency(this.total())
  }
  getPrice() {
    return this.item.getCurrency(this.price)
  }
}
