<template>
  <div class="invoice">
    <v-card>
      <v-card-title>Invoice (original)</v-card-title>
      <v-card-text>
        <div v-if="!p.invoice.invoiceNumber">Loading Please wait...</div>
        <div v-else>
          <v-row dense>
            <v-col cols="6">
              <v-card class="pa-2" outlined>
                <v-card-title class="headline">{{ p.invoice.getTargetCompanyName() }}</v-card-title>
                <v-card-text>
                  <div class="text--primary">{{ p.invoice.getTargetCompanyAddress() }}</div>
                  <p><v-row dense>
                    <v-col cols="6" sm="3"><v-chip color="primary" outlined>Tax Id</v-chip></v-col>
                    <v-col cols="6" sm="3">{{ p.invoice.getTargetCompanyTaxId() }}</v-col>
                    <v-col cols="6" sm="3"><v-chip color="primary" outlined>Tel</v-chip></v-col>
                    <v-col cols="6" sm="3">{{ p.invoice.getTargetCompanyTel() }}</v-col>
                  </v-row></p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="pa-2" outlined>
                <p><v-row dense>
                  <v-col cols="6" sm="3"><v-chip color="primary" outlined>Invoice Number</v-chip></v-col>
                  <v-col cols="6" sm="3">{{ p.invoice.invoiceNumber }}</v-col>
                  <v-col cols="6" sm="3"><v-chip color="primary" outlined>Invoice Date</v-chip></v-col>
                  <v-col cols="6" sm="3">{{ p.invoice.invoiceDate }}</v-col>
                </v-row></p>
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
                  <td class="text-right">{{ item.getPrice() }}</td>
                  <td class="text-right">{{ item.amount }}</td>
                  <td class="text-right">{{ item.getTotal() }}</td>
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
