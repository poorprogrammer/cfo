import InvoiceItem from '@/models/InvoiceItem'
import PricedInvoiceItem from '@/models/PricedInvoiceItem'

export default class Invoice {
  constructor(data) {
    if (!data) return

    this.id = data._id
    this.invoiceNumber = data.invoiceNumber
    this.companySlug = data.companySlug
    this.invoiceDate = data.invoiceDate
    this.items = []
    this.fromCompany = data.fromCompany
    this.targetCompany = data.targetCompany
    this.projectName = data.projectName
    this.dialog = false
    this.deleted = data.deleted || false

    if (!data.items) return
    data.items.forEach(i => {
      this.items.push(Object.assign(new PricedInvoiceItem(), i))
    });
  }
  url() { return `/invoice/${this.invoiceNumber}` }
  duplicationUrl() { return `/invoice/${this.invoiceNumber}/duplicate` }
  getItems() { return [...this.items, this.total(), this.tax(), this.grandTotal()] }
  total() { return new InvoiceItem('Total', this.getTotal()) }
  tax() { return new InvoiceItem('VAT 7%', this.getTotal() * 0.07) }
  grandTotal() { return new InvoiceItem('Grand Total', this.getTotal() * 1.07) }
  getTotal() { return this.items.map(getItemTotal).reduce(sum) }
  getFromCompanyName() { return this.fromCompany.name }
  getFromCompanyAddress() { return this.fromCompany.address }
  getFromCompanyTaxId() { return this.fromCompany.taxId }
  getFromCompanyTel() { return this.fromCompany.tel }
  getTargetCompanyName() { return this.targetCompany.name }
  getTargetCompanyAddress() { return this.targetCompany.address }
  getTargetCompanyTaxId() { return this.targetCompany.taxId }
  getTargetCompanyTel() { return this.targetCompany.tel }
  getProjectName() { return this.projectName }
  getTitles() {
    return [
      {id: 1, title: 'Invoice (original)', css: ''},
      {id: 2, title: 'Invoice (copy)', css: 'print-only'},
    ]
  }
  markAsDeleted() {
    this.deleted = true
    this.invoiceNumber = `${this.invoiceNumber}-cancelled-${this.currentTimestamp()}`
  }
  currentTimestamp() {
    return new Date().getTime()
  }
  addItemBefore(item) {
    let i = this.items.indexOf(item)
    if(i<0) i = this.items.length
    this.items.splice(i, 0, new PricedInvoiceItem())
  }
}

function getItemTotal(item) { return item.total() }
function sum(x, y) { return x + y }
