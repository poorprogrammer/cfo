import InvoiceItem from '@/models/InvoiceItem'

export default class Invoice {
  constructor(data) {
    if(!data) return

    this.invoiceNumber = data.invoiceNumber
    this.companySlug = data.companySlug
    this.invoiceDate = data.invoiceDate
    this.items = []

    if(!data.items) return
    data.items.forEach(i => {
      this.items.push(new InvoiceItem(i))
    });
  }
  url() { return `/invoice/${this.invoiceNumber}` }
  getItems() { return [...this.items, this.total(), this.tax()] }
  total() { return new Total(this.getTotal()) }
  tax() { return new Tax(this.getTotal()) }
  getTotal() { return this.items.map(getItemTotal).reduce(sum) }
}

function getItemTotal(item) { return item.total() }
function sum(x, y) { return x + y }

class Total {
  constructor(t) {
    this.name = 'Total'
    this.price = ''
    this.amount = ''
    this.t = t
  }
  total() { return this.t }
}

class Tax {
  constructor(t) {
    this.name = 'Tax'
    this.price = ''
    this.amount = ''
    this.t = t
  }
  total() { return this.t * 0.07 }
}