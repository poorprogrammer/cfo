import axios from "axios";
import Invoice from '@/models/Invoice'

export default class {
  constructor() {
    this.root = process.env.VUE_APP_BASE_API
  }

  invoicesUrl() {
    return `${this.root}/invoices/2020`
  }

  getInvoices() {
    return axios.get(this.invoicesUrl())
      .then(this.parseInvoices)
  }

  getInvoice(invoiceNumber) {
    return axios.get(`${this.root}/invoice/${invoiceNumber}`)
      .then(response => response.data)
  }

  parseInvoices = (response) => {
    let invoices = []
    response.data.forEach(invoice => {
      invoices.push(new Invoice(invoice))
    })
    return invoices
  }
}
