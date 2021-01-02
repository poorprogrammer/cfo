import axios from "axios";
import Invoice from '@/models/Invoice'

export default class {
  constructor() {
    this.root = process.env.VUE_APP_BASE_API
  }

  invoicesUrl(year) {
    return `${this.root}/invoices/${year}`
  }

  getInvoices(year) {
    return axios.get(this.invoicesUrl(year))
      .then(this.parseInvoices)
  }

  getInvoice(invoiceNumber) {
    return axios.get(`${this.root}/invoice/${invoiceNumber}`)
      .then(this.parseInvoice)
  }

  save(invoice) {
    return axios.post(`${this.root}/invoice/${invoice.invoiceNumber}`, invoice)
      .then(this.parseInvoiceNumber)
  }

  parseInvoices = (response) => {
    let invoices = []
    response.data.forEach(invoice => {
      invoices.push(new Invoice(invoice))
    })
    return invoices
  }

  parseInvoice = (response) => {
    return new Invoice(response.data)
  }

  parseInvoiceNumber = (response) => {
    return response.data
  }
}
