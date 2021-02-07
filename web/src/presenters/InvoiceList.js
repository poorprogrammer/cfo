export default class {
  constructor(view, api) {
    this.view = view
    this.items = []
    this.headers = [
      { text: 'Number', value: 'number' },
      { text: 'Company', value: 'targetCompany.name' },
      { text: 'Project', value: 'projectName' },
      { text: 'Date', value: 'date' },
      { text: 'Actions', value: 'action', sortable: false },
    ]
    this.API = api
  }
  init(year) {
    this.API.getAll(year)
      .then(this.setAll)
  }
  setAll = (items) => {
    this.items = items
  }
  sortBy = () => ("number")
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
