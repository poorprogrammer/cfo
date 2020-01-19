<template>
  <div class="invoice">
    <v-card>
      <v-card-title>Invoice (original)</v-card-title>
    </v-card>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Item</th>
          <th class="text-left">Price</th>
          <th class="text-left">Amount</th>
          <th class="text-left">Total</th>
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

export default {
  name: 'invoice',
  data() {
    return {
      p: new Presenter(this),
    }
  }
}
</script>
