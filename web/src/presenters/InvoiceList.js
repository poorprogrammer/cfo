import API from '@/services/invoices'

export default class {
    constructor (view) {
      this.view = view
      this.invoices = []
      this.headers = [
        { text: 'Number', value: 'invoiceNumber' },
        { text: 'Company', value: 'companySlug' },
        { text: 'Date', value: 'invoiceDate' },
      ]
      this.API = new API()
    }
    init () {
      this.API.getInvoices()
        .then(this.setInvoices)
    }
    setInvoices = (invoices) => {
      this.invoices = []
      invoices.forEach(invoice => {
        this.invoices.push(new Invoice(invoice))
      })
    }
}

class Invoice {
  constructor(data) {
    this.invoiceNumber = data.invoiceNumber
    this.companySlug = data.companySlug
    this.invoiceDate = data.invoiceDate
  }
  url() {
    return `/${this.invoiceNumber}/invoice`
  }
}