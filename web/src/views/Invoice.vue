<template>
  <div class="invoice">
    <v-card>
      <v-card-title>Invoice (original)</v-card-title>
      <v-card-text>
        <div v-if="!p.invoice.invoiceNumber">Loading Please wait...</div>
        <div v-else>
          <v-row align="stretch" justify="space-between">
            <v-col cols="8">
              <v-card class="ma-3 pa-2">
                <v-card-title>{{ p.invoice.getTargetCompanyName() }}</v-card-title>
                <p>{{ p.invoice.getTargetCompanyAddress() }}</p>
                <p><v-chip color="primary" outlined>Tax Id</v-chip> {{ p.invoice.getTargetCompanyTaxId() }}</p>
                <p><v-chip color="primary" outlined>Tel</v-chip> {{ p.invoice.getTargetCompanyTel() }}</p>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="ma-3 pa-2">
                <p><v-chip color="primary" outlined>Invoice Number</v-chip> {{ p.invoice.invoiceNumber }}</p>
                <p><v-chip color="primary" outlined>Invoice Date</v-chip> {{ p.invoice.invoiceDate }}</p>
              </v-card>
            </v-col>
          </v-row>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th scope="col" class="text-left">Item</th>
                  <th scope="col" class="text-right">Price</th>
                  <th scope="col" class="text-right">Amount</th>
                  <th scope="col" class="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in p.invoice.getItems()" :key="item.name">
                  <td class="text-left">{{ item.name }}</td>
                  <td class="text-right">{{ item.price }}</td>
                  <td class="text-right">{{ item.amount }}</td>
                  <td class="text-right">{{ item.total() }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-card-text>
    </v-card>
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
<style>
@media print {
  html, body {
    width: 210mm;
    height: 297mm;
  }
  header {
    visibility: hidden;
  }
}
</style>
