import InvoiceItem from '@/models/InvoiceItem'

export default class Invoice {
  constructor(data) {
    if(!data) return

    this.invoiceNumber = data.invoiceNumber
    this.companySlug = data.companySlug
    this.invoiceDate = data.invoiceDate
    this.items = []
    this.targetCompany = data.targetCompany

    if(!data.items) return
    data.items.forEach(i => {
      this.items.push(new InvoiceItem(i))
    });
  }
  url() { return `/invoice/${this.invoiceNumber}` }
  getItems() { return [...this.items, this.total(), this.tax(), this.grandTotal()] }
  total() { return new CalculatedItem('Total', this.getTotal()) }
  tax() { return new CalculatedItem('Tax', this.getTotal() * 0.07) }
  grandTotal() { return new CalculatedItem('Grand Total', this.getTotal() * 1.07)}
  getTotal() { return this.items.map(getItemTotal).reduce(sum) }
  getTargetCompanyName() { return this.targetCompany.name }
  getTargetCompanyAddress() { return this.targetCompany.address }
  getTargetCompanyTaxId() { return this.targetCompany.taxId }
  getTargetCompanyTel() { return this.targetCompany.tel }
}

function getItemTotal(item) { return item.total() }
function sum(x, y) { return x + y }

class CalculatedItem {
  constructor(name, t) {
    this.name = name
    this.t = t
  }
  total() { return new Intl.NumberFormat('th-TH', {style: 'currency', currency: 'THB'}).format(this.t) }
}