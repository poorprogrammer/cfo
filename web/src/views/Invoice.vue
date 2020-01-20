<template>
  <div class="invoice">
    <v-card>
      <v-card-title>Invoice (original)</v-card-title>
    </v-card>
    <p>{{ p.invoice }}</p>
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
        <tr v-for="item in p.items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.total() }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
import Presenter from '@/presenters/Invoice'
import { serverBus } from '@/main.js';

export default {
  name: 'invoice',
  data() {
    return {
      p: new Presenter(this),
      invoice: null
    }
  },
  created() {
    serverBus.$on('invoiceSelected', (i) => {
      this.p.invoice = i
    })
  }
}
</script>
