<template>
  <div class="invoice pa-3">
    <div v-if="!p.invoice.invoiceNumber">Loading Please wait...</div>
    <div v-else>
      <div
        v-for="{ id, title, css } in p.invoice.getTitles()"
        :key="id"
        :class="css"
      >
        <v-row align="stretch" dense>
          <v-col cols="12">
            <div class="no-print">
              <span class="font-weight-bold">Filename: </span>
              {{ p.invoice.filename() }}
            </div>
            <v-card flat class="from-company">
              <v-list-item three-line>
                <v-list-item-content>
                  <p class="title mb-1">{{
                    p.invoice.getFromCompanyName()
                  }}</p>
                  <p class="text--primary">
                    {{ p.invoice.getFromCompanyAddress() }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Tax Id</span>
                    {{ p.invoice.getFromCompanyTaxId() }}
                    <span class="font-weight-bold">Tel</span>
                    {{ p.invoice.getFromCompanyTel() }}
                  </p>
                </v-list-item-content>

                <v-list-item-avatar tile size="130">
                  <v-img
                    id="from-company-logo"
                    contain
                    eager
                    src="@/assets/logo.png"
                  />
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center" dense>
          <h2 class="heading">{{ title }}</h2>
        </v-row>

        <v-divider></v-divider>

        <v-row align="stretch" dense>
          <v-col cols="6" class="pa-4">
            <p class="text--primary title" :class="p.invoice.targetCompanyNameClass()">
              {{ p.invoice.getTargetCompanyName() }}
            </p>
            <p class="text--primary address">
              {{ p.invoice.getTargetCompanyAddress() }}
            </p>
            <p class="text--primary">
              <v-row dense>
                <base-text label="Tax Id" :value="p.invoice.getTargetCompanyTaxId()"/>
                <base-text label="Tel" :value="p.invoice.getTargetCompanyTel()"/>
              </v-row>
            </p>
          </v-col>
          <v-col cols="6">
            <v-card class="invoice-id" flat>
              <p class="body-2">
                <v-row dense>
                  <base-text label="Quotation Number" :value="p.invoice.quotationNumber"/>
                  <base-text label="Purchase Order Number" :value="p.invoice.purchaseOrderNumber"/>
                  <base-text label="Invoice Number" :value="p.invoice.invoiceNumber"/>
                  <base-text label="Invoice Date" :value="p.invoice.invoiceDate"/>
                  <base-text label="Remark" :value="p.invoice.remark"/>
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
                <td :class="p.invoice.itemClass()" class="item text-left">{{ item.name }}</td>
                <td :class="p.invoice.itemClass()" class="item text-right">{{ item.getPrice() }}</td>
                <td :class="p.invoice.itemClass()" class="item text-right">{{ item.amount }}</td>
                <td :class="p.invoice.itemClass()" class="item text-right">{{ item.getTotal() }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-row class="signature print-only pa-3" dense>
          <v-col cols="6">
            <v-card outlined>
              <v-img></v-img>
              <v-divider></v-divider>
              <v-card-text>Received By</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
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
      <back-button></back-button>
    </div>
  </div>
</template>

<script>
import Presenter from "@/presenters/Invoice";
import BackButton from '@/components/BackButton.vue';
import BaseText from '@/components/BaseText.vue';

export default {
  components: { BackButton, BaseText },
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
  .v-application div.print-only.signature {
    display: flex;
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
    min-height: 220px;
  }
  .v-application .to-company {
    min-height: 220px;
  }
  .v-application .v-data-table {
    min-height: 364px;
  }
  .v-application td.item.small {
    padding: 2px;
    height: 24px;
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
.title.small {
  font-size: 1rem !important;
  line-height: 1rem;
}
.v-application div.from-company div.v-list-item__content {
  align-self: center;
}
.v-application .from-company p {
  margin-bottom: 4px;
}
h2.heading {
  font-size: 2rem;
}
</style>
