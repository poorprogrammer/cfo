import Invoice from '@/models/Invoice'

export default class {
    constructor (view, api) {
      this.view = view
      this.invoice = new Invoice()
      this.API = api;
    }
    init(invoiceNumber) {
      this.API.get(invoiceNumber)
        .then((invoice) => this.invoice = invoice)
    }
    save() {
      this.API.save(this.invoice)
        .then((invoiceNumber) => {
          this.view.goTo({name: 'invoice', params: {invoiceNumber: invoiceNumber}})
        }, (error) => {
          this.showError(error)
        })
    }
    update() {
      this.API.update(this.invoice)
      .then(() => {
        this.view.goTo({name: 'home'})
      }, (error) => {
        this.showError(error)
      })
    }
    addItemClickedOn(item) {
      this.invoice.addItemBefore(item)
    }
    removeItemClickedOn(item) {
      this.invoice.removeItem(item)
    }
    todayClicked() {
      this.invoice.setDateToday()
    }
    showError(error) {
      alert(error)
    }
}
