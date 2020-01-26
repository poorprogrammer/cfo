<template>
  <div class="invoice">
    <v-card>
      <v-card-title>Invoice (original)</v-card-title>
    </v-card>
    <div v-if="!p.invoice.invoiceNumber">Loading Please wait...</div>
    <div v-else>
      <p>Invoice Number: {{ p.invoice.invoiceNumber }}</p>
      <p>Company: {{ p.invoice.companySlug }}</p>
      <p>Invoice Date: {{ p.invoice.invoiceDate }}</p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th scope="col" class="text-left">Item</th>
              <th scope="col" class="text-left">Price</th>
              <th scope="col" class="text-left">Amount</th>
              <th scope="col" class="text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in p.invoice.getItems()" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.total() }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import Presenter from '@/presenters/Invoice'

export default {
  name: 'invoice',
  mounted() {
    this.p.init(this.$route.params.invoiceNumber)
  },
  data() {
    return {
      p: new Presenter(this),
    }
  }
}
</script>
