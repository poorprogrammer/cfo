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
    if(this.total()== 0) return ''
    return this.item.getCurrency(this.total())
  }
  getPrice() {
    if(this.price == 0) return ''
    return this.item.getCurrency(this.price)
  }
}
