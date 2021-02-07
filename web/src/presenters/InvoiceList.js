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
    this.API.getAll(year)
      .then(this.setAll)
  }
  setAll = (items) => {
    this.invoices = items
  }
  sortBy = () => ("invoiceNumber")
  sortDesc = () => (true)
  delete = (invoice) => {
    this.API.delete(invoice).then(this.removeInvoiceFromList)
    this.closeDeleteConfirmDialogOf(invoice)
  }
  removeInvoiceFromList = (invoice) => {
    this.invoices = this.invoices.filter((i) => i.invoiceNumber !== invoice.invoiceNumber)
  }
  cancelDelete = (invoice) => {
    this.closeDeleteConfirmDialogOf(invoice)
  }
  closeDeleteConfirmDialogOf = (invoice) => {
    invoice.dialog = false
  }
}
