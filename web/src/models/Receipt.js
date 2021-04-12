import PaymentInformation from '@/models/PaymentInformation'

export default class Receipt extends PaymentInformation {
  constructor(data) {
    super(data)
    if (!data) return

    this.receiptNumber = data.receiptNumber
    this.receiptDate = data.receiptDate
  }
  get number() { return this.receiptNumber }
  set number(n) { this.receiptNumber = n }
  get date() { return this.receiptDate }
  set date(d) { this.receiptDate = d }
  get documentType() {
    return 'Receipt'
  }
  get hasInvoiceNumber() { return false; }
  get hasReceiptNumber() { return true; }
}