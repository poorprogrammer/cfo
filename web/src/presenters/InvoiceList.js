import API from '@/services/invoices'

export default class {
  constructor(view) {
    this.view = view
    this.invoices = []
    this.headers = [
      { text: 'Number', value: 'invoiceNumber' },
      { text: 'Company', value: 'targetCompany.name' },
      { text: 'Project', value: 'projectName' },
      { text: 'Date', value: 'invoiceDate' },
      { text: 'Actions', value: 'action', sortable: false },
    ]
    this.API = new API()
  }
  init(year) {
    this.API.getInvoices(year)
      .then(this.setInvoices)
  }
  setInvoices = (invoices) => {
    this.invoices = invoices
  }
  sortBy = () => ("invoiceNumber")
  sortDesc = () => (true)
  delete = (invoice) => {
    this.API.delete(invoice).then((invoice) => {
      this.invoices.pop(invoice)
    })
    this.closeDeleteConfirmDialogOf(invoice)
  }
  cancelDelete = (invoice) => {
    this.closeDeleteConfirmDialogOf(invoice)
  }
  closeDeleteConfirmDialogOf = (invoice) => {
    invoice.dialog = false
  }
}
