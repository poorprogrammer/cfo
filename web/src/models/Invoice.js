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
  get documentType() {
    return 'Invoice'
  }
  get hasInvoiceNumber() { return true; }
}