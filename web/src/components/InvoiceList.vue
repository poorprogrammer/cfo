<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <table>
      <caption>The Beatles</caption>
      <tr v-for="invoice in invoices">
        <td>{{ invoice.invoiceDate }}</td>
        <td>{{ invoice.amount }}</td>
        <td>{{ invoice.invoiceNumber }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'InvoiceList',
  props: {
    msg: String
  },
  data() {
    return {
      invoices: null
    }
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_BASE_API + '/spacex/invoices')
      .then(response => (this.invoices = response.data))
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
