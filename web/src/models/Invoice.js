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
  url() {
    return `/invoice/${this.invoiceNumber}`
  }
  getItems() {
    return this.items
  }
}
