export default class Invoice {
  constructor(data) {
    if(!data) return

    this.invoiceNumber = data.invoiceNumber
    this.companySlug = data.companySlug
    this.invoiceDate = data.invoiceDate
  }
  url() {
    return `/invoice/${this.invoiceNumber}`
  }
}
