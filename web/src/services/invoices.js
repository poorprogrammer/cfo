import axios from "axios";
import Invoice from '@/models/Invoice'

export default class {
  constructor() {
    this.root = process.env.VUE_APP_BASE_API
  }

  allUrl(year) {
    return `${this.root}/invoices/${year}`
  }

  getAll(year) {
    return axios.get(this.allUrl(year))
      .then(this.parseAll)
  }

  get(invoiceNumber) {
    return axios.get(`${this.root}/invoice/${invoiceNumber}`)
      .then(this.parseItem)
  }

  save(invoice) {
    return axios.post(`${this.root}/invoices/`, this.createDTO(invoice))
      .then(this.parseNumber)
  }

  delete(invoice) {
    invoice.markAsDeleted()
    return this.update(invoice)
  }

  update(invoice) {
    let url = `${this.root}/invoice/${invoice.invoiceNumber}`
    return axios.put(url, this.createDTO(invoice))
      .then(this.parseItem)
  }

  parseAll = (response) => {
    let invoices = []
    response.data.forEach(invoice => {
      invoices.push(new Invoice(invoice))
    })
    return invoices
  }

  parseItem = (response) => {
    return new Invoice(response.data)
  }

  parseNumber = (response) => {
    return response.data
  }

  createDTO = (invoice) => {
    let dto = {}
    Object.assign(dto, invoice)
    if(!dto.items) return dto
    dto.items.forEach((item) => {
      delete item.item
    })
    return dto
  }
}
