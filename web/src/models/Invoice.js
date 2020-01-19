export default class Invoice {
  constructor(data) {
    this.invoiceNumber = data.invoiceNumber
    this.companySlug = data.companySlug
    this.invoiceDate = data.invoiceDate
  }
  url() {
    return `/invoice/${this.invoiceNumber}`
  }
}
