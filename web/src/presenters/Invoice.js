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
        .then((invoice) => this.invoice = new Invoice(invoice))
    }
}
