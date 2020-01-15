<template>
  <div>
    <h1>{{titleMsg}}</h1>
    <v-data-table :headers="headers" :items="invoices" :items-per-page="5"></v-data-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'InvoiceList',
  props: {
    titleMsg: String
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_BASE_API + '/spacex/invoices')
      .then(response => (this.invoices = response.data))
  },
  data() {
    return {
      invoices: [],
      headers: [
        { text: 'Number', value: 'invoiceNumber' },
        { text: 'Date', value: 'invoiceDate' },
        { text: 'Amount (baht)', value: 'amount' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
