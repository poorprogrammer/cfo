import axios from "axios";

export default class {
  invoicesUrl() {
    return process.env.VUE_APP_BASE_API + "/2020/invoices";
  }

  getInvoices() {
    return axios.get(this.invoicesUrl())
                .then(response => response.data);
  }
}
