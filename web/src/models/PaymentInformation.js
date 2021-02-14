import InvoiceItem from '@/models/InvoiceItem'
import PricedInvoiceItem from '@/models/PricedInvoiceItem'

export default class PaymentInformation {
  constructor(data) {
    if (!data) return

    this.id = data._id
    this.companySlug = data.companySlug
    this.items = []
    this.fromCompany = Object.assign({}, data.fromCompany)
    this.targetCompany = Object.assign({}, data.targetCompany)
    this.projectName = data.projectName
    this.remark = data.remark
    this.currency = data.currency
    this.dialog = false
    this.deleted = data.deleted || false
    this.currencies = {
      "THB": new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', currencyDisplay: 'code' }),
      "USD": new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD', currencyDisplay: 'code' }),
    }

    if (!data.items) return
    data.items.forEach(i => {
      this.items.push(Object.assign(this.createPricedInvoiceItem(), i))
    });
  }
  url() { return `/${this.documentType.toLowerCase()}/${this.number}` }
  duplicationUrl() { return `${this.url()}/duplicate` }
  editionUrl() { return `${this.url()}/edit` }
  getItems() { return [...this.items, this.total(), this.tax(), this.grandTotal()] }
  total() { return new InvoiceItem('Total', this.getTotal(), this) }
  tax() { return new InvoiceItem('VAT 7%', this.getTotal() * 0.07, this) }
  grandTotal() { return new InvoiceItem('Grand Total', this.getTotal() * 1.07, this) }
  getTotal() { return this.items.map(getItemTotal).reduce(sum) }
  getFromCompanyName() { return this.fromCompany.name }
  getFromCompanyAddress() { return this.fromCompany.address }
  getFromCompanyTaxId() { return this.fromCompany.taxId }
  getFromCompanyTel() { return this.fromCompany.tel }
  getTargetCompanyName() { return this.targetCompany.name }
  targetCompanyNameClass() {
    return this.getTargetCompanyName().length > 40? "small" : ""
  }
  itemClass() {
    return this.items.length > 3? "small": ""
  }
  getTargetCompanyAddress() { return this.targetCompany.address }
  getTargetCompanyTaxId() { return this.targetCompany.taxId }
  getTargetCompanyTel() { return this.targetCompany.tel }
  getProjectName() { return this.projectName }
  getTitles() {
    return [
      {id: 1, title: `${this.documentType} (original)`, css: ''},
      {id: 2, title: `${this.documentType} (copy)`, css: 'print-only'},
    ]
  }
  getCurrencies() {
    return Object.keys(this.currencies)
  }
  markAsDeleted() {
    this.deleted = true
    this.number = `${this.number}-cancelled-${this.currentTimestamp()}`
  }
  currentTimestamp() {
    return new Date().getTime()
  }
  addItemBefore(item) {
    let i = this.items.indexOf(item)
    if(i<0) i = this.items.length
    this.items.splice(i, 0, this.createPricedInvoiceItem())
  }
  removeItem(item) {
    let i = this.items.indexOf(item)
    if(i<0) return
    this.items.splice(i, 1)
  }
  setDateToday(today=new Date()) {
    this.date = this.formatDate(today)
  }
  formatDate(date) {
    let y = date.getFullYear();
    let m = (1 + date.getMonth()).toString().padStart(2, '0');
    let d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`
  }
  createPricedInvoiceItem() {
    return new PricedInvoiceItem(this)
  }
  filename() {
    return `${this.reverseNumber()}_${this.documentType.toUpperCase()}_${this.targetCompany.name}_${this.projectName}`
  }
  reverseNumber() {
    let words = this.number.split('-')
    return `${words[1]}-${words[0].substring(4)}${words[0].substring(0,4)}`
  }
  get listUrl() {
    return {name: `${this.documentType.toLowerCase()}s`}
  }
}

function getItemTotal(item) { return item.total() }
function sum(x, y) { return x + y }
