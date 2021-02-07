import API from '@/services/invoices'

export default class {
  constructor(view) {
    this.view = view
    this.items = []
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
    this.items = items
  }
  sortBy = () => ("invoiceNumber")
  sortDesc = () => (true)
  delete = (item) => {
    this.API.delete(item).then(this.removeItemFromList)
    this.closeDeleteConfirmDialogOf(item)
  }
  removeItemFromList = (item) => {
    this.items = this.items.filter((i) => i.invoiceNumber !== item.invoiceNumber)
  }
  cancelDelete = (item) => {
    this.closeDeleteConfirmDialogOf(item)
  }
  closeDeleteConfirmDialogOf = (item) => {
    item.dialog = false
  }
}
