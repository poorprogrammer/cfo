import API from '@/services/invoices'
import Invoice from '@/models/Invoice'

export default class {
  constructor(view) {
    this.view = view
    this.invoices = []
    this.headers = [
      { text: 'Number', value: 'invoiceNumber' },
      { text: 'Company', value: 'companySlug' },
      { text: 'Date', value: 'invoiceDate' },
    ]
    this.API = new API()
    // this.API.init()
  }
  init() {
    this.API.getInvoices()
      .then(this.setInvoices)
  }
  setInvoices = (invoices) => {
    this.invoices = []
    invoices.forEach(invoice => {
      this.invoices.push(new Invoice(invoice))
    })
  }
  sortBy = () => ("invoiceNumber")
  sortDesc = () => (true)
}
