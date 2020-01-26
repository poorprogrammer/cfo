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
      { text: 'Actions', value: 'action', sortable: false },
    ]
    this.API = new API()
  }
  init() {
    this.API.getInvoices()
      .then(this.setInvoices)
  }
  setInvoices = (invoices) => {
    this.invoices = invoices
  }
  sortBy = () => ("invoiceNumber")
  sortDesc = () => (true)
}
