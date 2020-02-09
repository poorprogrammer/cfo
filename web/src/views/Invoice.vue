<template>
  <div class="invoice pa-3">
    <div v-if="!p.invoice.invoiceNumber">Loading Please wait...</div>
    <div v-else>
      <v-row justify="center" dense>
        <h2>Invoice (original)</h2>
      </v-row>
      <v-row align="stretch" dense>
        <v-col cols="12">
          <v-card class="pa-2" outlined>
             <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">From Company</div>
                <v-list-item-title class="headline mb-1">{{ p.invoice.getFromCompanyName() }}</v-list-item-title>
                <v-list-item-subtitle class="text--primary">
                  {{ p.invoice.getFromCompanyAddress() }}

                  <p><v-row dense>
                    <v-col cols="3" sm="2"><v-chip color="primary" outlined>Tax Id</v-chip></v-col>
                    <v-col cols="3" sm="2">{{ p.invoice.getFromCompanyTaxId() }}</v-col>
                    <v-col cols="3" sm="2"><v-chip color="primary" outlined>Tel</v-chip></v-col>
                    <v-col cols="3" sm="2">{{ p.invoice.getFromCompanyTel() }}</v-col>
                  </v-row></p>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="150">
                <v-img id="from-company-logo" contain src="@/assets/odds_logo.png"/>
              </v-list-item-avatar>
             </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="stretch" dense>
        <v-col cols="6">
          <v-card class="pa-2" outlined>
            <div class="overline mb-4">To Company</div>
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
      <v-row id="signatures" class="pa-3" dense>
        <v-col id="receive-signature" cols="6">
          <v-card outlined>
            <v-img></v-img>
            <v-divider></v-divider>
            <v-card-text>
              Received By
            </v-card-text>
          </v-card>
        </v-col>
        <v-col id="approve-signature" cols="6">
          <v-card outlined>
            <v-img></v-img>
            <v-divider></v-divider>
            <v-card-text>
              Approved By
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
<style>
@media print {
  html, body {
    width: 210mm;
    height: 297mm;
  }
  header {
    visibility: hidden;
  }
  #from-company-logo {
     -webkit-print-color-adjust: exact;
  }
  div#signatures {
    display: flex;
  }
}
h2 {
  font-weight: 500
}
div.v-image {
  height: 200px
}
#signatures {
  display: none;
}
</style>
