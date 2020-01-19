import axios from "axios";

export default class {
  constructor() { this.root = '' }

  init() { this.root = process.env.VUE_APP_BASE_API }

  invoicesUrl() {
    return  `${this.root}/invoices/2020`
  }

  getInvoices() {
    return axios.get(this.invoicesUrl())
                .then(response => response.data);
  }
}
