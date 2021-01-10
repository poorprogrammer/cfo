<template>
  <div class="invoice pa-3">
    <div v-if="!p.invoice.invoiceNumber">Loading Please wait...</div>
    <div v-else>
      <v-row justify="center" dense>
        <h2>Unsave Invoice (edit mode)</h2>
      </v-row>
      <v-row align="stretch" dense>
        <v-col cols="12">
          <v-card outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">From Company</div>
                <v-list-item-title class="title mb-1"><v-text-field label="Name" v-model="p.invoice.fromCompany.name"/></v-list-item-title>
                <v-list-item-subtitle class="text--primary">
                  <p class="text--primary"><v-text-field label="Address" v-model="p.invoice.fromCompany.address"/></p>
                  <p>
                    <v-row dense>
                      <v-col cols="6" sm="4"><v-text-field label="Tax Id" v-model="p.invoice.fromCompany.taxId"/></v-col>
                      <v-col cols="6" sm="4"><v-text-field label="Tel" v-model="p.invoice.fromCompany.tel"/></v-col>
                    </v-row>
                  </p>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="130">
                <v-img id="from-company-logo" contain src="@/assets/logo.png" />
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="stretch" dense>
        <v-col cols="6">
          <v-card class="pa-2" outlined>
            <div class="overline mb-4">To Company</div>
            <v-card-title class="title"><v-text-field label="Name" v-model="p.invoice.targetCompany.name"/></v-card-title>
            <v-card-text>
              <p class="text--primary"><v-text-field label="Address" v-model="p.invoice.targetCompany.address"/></p>
              <p class="text--primary">
                <v-row dense>
                  <v-col cols="12" sm="6"><v-text-field label="Tax Id" v-model="p.invoice.targetCompany.taxId"/></v-col>
                  <v-col cols="12" sm="6"><v-text-field label="Tel" v-model="p.invoice.targetCompany.tel"/></v-col>
                </v-row>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-2" outlined>
            <p class="body-2">
              <v-row dense>
                <v-col cols="12" sm="6"><v-text-field id="invoice-number" label="Invoice Number" v-model="p.invoice.invoiceNumber"/></v-col>
                <v-col cols="8" sm="4"><v-text-field id="invoice-date" label="Invoice Date" v-model="p.invoice.invoiceDate"/></v-col>
                <v-col cols="4" sm="2">
                  <v-btn id="today-button" class="mx-1" fab dark color="accent" @click="today">
                    <v-icon dark>mdi-calendar</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6"><v-text-field id="project" label="Project" v-model="p.invoice.projectName"/></v-col>
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
              <th scope="col" class="text-right">+/-</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in p.invoice.getItems()" :key="item">
              <td class="text-left"><v-text-field label="Item" v-model="item.name"/></td>
              <td class="text-right"><v-text-field label="Price" v-model="item.price"/></td>
              <td class="text-right"><v-text-field label="Amount" v-model="item.amount"/></td>
              <td class="text-right">{{ item.getTotal() }}</td>
              <td class="text-right">
                <v-btn class="mx-1 add-item" v-on:click="addItem(item)" x-small fab dark color="green">
                  <v-icon>mdi-arrow-up-circle</v-icon>
                </v-btn>
                <v-btn class="mx-1 remove-item" v-on:click="removeItem(item)" x-small fab dark color="red">
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div class="no-print">
      <router-link to="/invoices" class="back-btn">
        <v-btn id="back-button" class="mx-1" fab dark color="accent">
          <v-icon dark>mdi-arrow-left-circle</v-icon>
        </v-btn>
      </router-link>
      <v-btn id="save-button" @click="save" class="mx-1" fab dark color="primary">
        <v-icon dark>mdi-content-save</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import Presenter from '@/presenters/Invoice'

export default {
  name: 'duplicatedInvoice',
  mounted() {
    this.p.init(this.$route.params.invoiceNumber)
  },
  data() {
    return {
      p: new Presenter(this)
    }
  },
  methods: {
    save: function() { this.p.save() },
    today: function() { this.p.todayClicked() },
    addItem: function(item) { this.p.addItemClickedOn(item) },
    removeItem: function(item) { this.p.removeItemClickedOn(item) },
    goTo: function(path) { this.$router.push(path) }
  }
}
</script>
<style scoped>
h2 {
  font-weight: 500;
}
a.back-btn {
  text-decoration: none;
}
</style>
