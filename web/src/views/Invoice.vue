<template>
  <div class="invoice pa-3">
    <div v-if="!p.invoice.invoiceNumber">Loading Please wait...</div>
    <div v-else>
      <div
        v-for="{ id, title, css } in p.invoice.getTitles()"
        :key="id"
        :class="css"
      >
        <v-row justify="center" dense>
          <h2>{{ title }}</h2>
        </v-row>
        <v-row align="stretch" dense>
          <v-col cols="12">
            <v-card outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">From Company</div>
                  <v-list-item-title class="title mb-1">{{
                    p.invoice.getFromCompanyName()
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="text--primary">
                    <p class="text--primary">
                      {{ p.invoice.getFromCompanyAddress() }}
                    </p>
                    <p>
                      <v-row dense>
                        <v-col cols="3" sm="2">
                          <span class="font-weight-bold">Tax Id</span>
                        </v-col>
                        <v-col cols="3" sm="2">{{
                          p.invoice.getFromCompanyTaxId()
                        }}</v-col>
                        <v-col cols="3" sm="2">
                          <span class="font-weight-bold">Tel</span>
                        </v-col>
                        <v-col cols="3" sm="2">{{
                          p.invoice.getFromCompanyTel()
                        }}</v-col>
                      </v-row>
                    </p>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="130">
                  <v-img
                    id="from-company-logo"
                    contain
                    src="@/assets/logo.png"
                  />
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="stretch" dense>
          <v-col cols="6">
            <v-card class="pa-2" outlined>
              <div class="overline mb-4">To Company</div>
              <v-card-title class="title">{{
                p.invoice.getTargetCompanyName()
              }}</v-card-title>
              <v-card-text>
                <p class="text--primary">
                  {{ p.invoice.getTargetCompanyAddress() }}
                </p>
                <p class="text--primary">
                  <v-row dense>
                    <v-col cols="6" sm="3">
                      <span class="font-weight-bold">Tax Id</span>
                    </v-col>
                    <v-col cols="6" sm="3">{{
                      p.invoice.getTargetCompanyTaxId()
                    }}</v-col>
                    <v-col cols="6" sm="3">
                      <span class="font-weight-bold">Tel</span>
                    </v-col>
                    <v-col cols="6" sm="3">{{
                      p.invoice.getTargetCompanyTel()
                    }}</v-col>
                  </v-row>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="invoice-id pa-2" outlined>
              <p class="body-2">
                <v-row dense>
                  <v-col cols="6" sm="3">
                    <span class="font-weight-bold">Invoice Number</span>
                  </v-col>
                  <v-col cols="6" sm="3">{{ p.invoice.invoiceNumber }}</v-col>
                  <v-col cols="6" sm="3">
                    <span class="font-weight-bold">Invoice Date</span>
                  </v-col>
                  <v-col cols="6" sm="3">{{ p.invoice.invoiceDate }}</v-col>
                </v-row>
              </p>
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
        <v-row id="signatures" class="print-only pa-3" dense>
          <v-col id="receive-signature" cols="6">
            <v-card outlined>
              <v-img></v-img>
              <v-divider></v-divider>
              <v-card-text>Received By</v-card-text>
            </v-card>
          </v-col>
          <v-col id="approve-signature" cols="6">
            <v-card outlined>
              <v-img></v-img>
              <v-divider></v-divider>
              <v-card-text>Approved By</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="no-print">
      <router-link to="/invoices" class="back-btn">
        <v-btn id="back-button" class="mx-1" fab dark color="accent">
          <v-icon dark>mdi-arrow-left-circle</v-icon>
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import Presenter from "@/presenters/Invoice";

export default {
  name: "invoice",
  mounted() {
    this.p.init(this.$route.params.invoiceNumber);
  },
  data() {
    return {
      p: new Presenter(this),
    };
  },
};
</script>
<style>
@media print {
  html,
  body {
    width: 210mm;
    height: 297mm;
  }
  header {
    visibility: hidden;
  }
  #from-company-logo {
    -webkit-print-color-adjust: exact;
  }
  .v-application div.print-only {
    display: block;
  }
  .no-print {
    display: none;
  }
  .v-application .mb-4 {
    margin-bottom: 0px !important;
  }
  .v-application .title {
    line-height: 1rem;
  }
  .v-application .pa-2 .v-application .pd-3 {
    padding: 0px;
  }
  .v-application .v-card__text {
    padding: 2px;
  }
  .v-application .invoice-id {
    min-height: 215px;
  }
  .v-application .v-data-table {
    min-height: 364px;
  }
  main.v-main {
    padding: 0px !important;
  }
}
h2 {
  font-weight: 500;
}
div.v-image {
  height: 150px;
}
.print-only {
  display: none;
}
.invoice-id {
  min-height: 230px
}
</style>
