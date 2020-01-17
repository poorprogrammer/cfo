import axios from 'axios'

export default {
    invoicesUrl () {
        return process.env.VUE_APP_BASE_API + '/spacex/invoices'
    },

    getInvoices () {
        return axios
                .get(this.invoicesUrl())
                .then(response => (response.data))
    }
  }
  