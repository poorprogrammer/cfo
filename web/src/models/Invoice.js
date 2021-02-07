import PaymentInformation from '@/models/PaymentInformation'

export default class Invoice extends PaymentInformation {
  constructor(data) {
    super(data)
    if (!data) return

    this.invoiceNumber = data.invoiceNumber
    this.invoiceDate = data.invoiceDate
    this.quotationNumber = data.quotationNumber
    this.purchaseOrderNumber = data.purchaseOrderNumber
  }
  get number() { return this.invoiceNumber }
  set number(n) { this.invoiceNumber = n }
  get date() { return this.invoiceDate }
  set date(d) { this.invoiceDate = d }
  url() { return `/invoice/${this.number}` }
  getTitles() {
    return [
      {id: 1, title: 'Invoice (original)', css: ''},
      {id: 2, title: 'Invoice (copy)', css: 'print-only'},
    ]
  }
  setInvoiceDateToday(today=new Date()) {
    this.invoiceDate = this.formatDate(today)
  }
  filename() {
    return `${this.reverseInvoiceNumber()}_INVOICE_${this.targetCompany.name}_${this.projectName}`
  }
  reverseInvoiceNumber() {
    let words = this.invoiceNumber.split('-')
    return `${words[1]}-${words[0].substring(4)}${words[0].substring(0,4)}`
  }
}