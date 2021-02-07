import PaymentInformation from '@/models/PaymentInformation'

export default class Quotation extends PaymentInformation {
  constructor(data) {
    super(data)
    if (!data) return

    this.quotationNumber = data.quotationNumber
    this.quotationDate = data.quotationDate
  }
  get number() { return this.quotationNumber }
  set number(n) { this.quotationNumber = n }
  get date() { return this.quotationDate }
  set date(d) { this.quotationDate = d }
  get documentType() {
    return 'Quotation'
  }
}