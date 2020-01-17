import API from '@/services/invoices'

export default class {
    constructor (view) {
      this.view = view
      this.invoices = []
      this.headers = [
        { text: 'Number', value: 'invoiceNumber' },
        { text: 'Date', value: 'invoiceDate' },
        { text: 'Amount (baht)', value: 'amount' }
      ]
    }
    init () {
        let setInvoices = (invoices) => ( this.invoices = invoices  )
        API.getInvoices()
           .then(setInvoices)
    }
}