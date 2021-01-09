import API from '@/services/invoices'
import Invoice from '@/models/Invoice'

export default class {
    constructor (view) {
      this.view = view
      this.invoice = new Invoice()
      this.API = new API();
    }
    init(invoiceNumber) {
      this.API.getInvoice(invoiceNumber)
        .then((invoice) => this.invoice = invoice)
    }
    save() {
      this.API.save(this.invoice)
        .then((invoiceNumber) => {
          this.view.goTo({name: 'invoice', params: {invoiceNumber: invoiceNumber}})
        }, (error) => {
          alert(error)
        })
    }
}
