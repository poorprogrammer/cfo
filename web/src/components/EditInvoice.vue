<template>
  <div v-if="p.invoice">
    <v-row justify="center" dense>
      <h2>Unsave {{ p.invoice.documentType }} (edit mode)</h2>
    </v-row>
    <v-row align="stretch" dense>
      <v-col cols="12">
        <v-card outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">From Company</div>
              <v-list-item-title class="title mb-1">
                <v-text-field
                  label="Name"
                  v-model="p.invoice.fromCompany.name"
                />
              </v-list-item-title>
              <v-list-item-subtitle class="text--primary">
                <p class="text--primary">
                  <v-text-field
                    label="Address"
                    v-model="p.invoice.fromCompany.address"
                  />
                </p>
                <p>
                  <v-row dense>
                    <v-col cols="6" sm="4">
                      <v-text-field
                        label="Tax Id"
                        v-model="p.invoice.fromCompany.taxId"
                      />
                    </v-col>
                    <v-col cols="6" sm="4">
                      <v-text-field
                        label="Tel"
                        v-model="p.invoice.fromCompany.tel"
                      />
                    </v-col>
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
          <v-card-title class="title">
            <v-text-field label="Name" v-model="p.invoice.targetCompany.name" />
          </v-card-title>
          <v-card-text>
            <p class="text--primary">
              <v-text-field
                label="Address"
                v-model="p.invoice.targetCompany.address"
              />
            </p>
            <p class="text--primary">
              <v-row dense>
                <base-input
                  id="to-tax-id"
                  label="Tax Id"
                  v-model="p.invoice.targetCompany.taxId"
                />
                <base-input
                  id="to-tel"
                  label="Tel"
                  v-model="p.invoice.targetCompany.tel"
                />
              </v-row>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-2" outlined>
          <p class="body-2">
            <v-row dense>
              <base-input
                v-if="p.invoice.hasInvoiceNumber"
                id="invoice-number"
                label="Invoice Number"
                v-model="p.invoice.invoiceNumber"
              />
              <v-col cols="8" sm="4" v-if="p.invoice.hasInvoiceNumber">
                <v-text-field
                  id="invoice-date"
                  label="Invoice Date"
                  v-model="p.invoice.invoiceDate"
                />
              </v-col>
              <base-input
                v-if="p.invoice.hasReceiptNumber"
                id="receipt-number"
                label="Receipt Number"
                v-model="p.invoice.receiptNumber"
              />
              <v-col cols="8" sm="4" v-if="p.invoice.hasReceiptNumber">
                <v-text-field
                  id="receipt-date"
                  label="Receipt Date"
                  v-model="p.invoice.receiptDate"
                />
              </v-col>
              <v-col cols="4" sm="2">
                <button
                  id="today-button"
                  class="action-button primary"
                  @click="today"
                  title="Set Today's Date"
                >
                  <span class="icon">📅</span>
                </button>
              </v-col>
              <base-input
                v-if="!p.invoice.hasReceiptNumber"
                id="quotation-number"
                label="Quotation Number"
                v-model="p.invoice.quotationNumber"
              />
              <v-col cols="8" sm="4" v-if="!p.invoice.hasReceiptNumber">
                <v-text-field
                  id="quotation-date"
                  label="Quotation Date"
                  v-model="p.invoice.quotationDate"
                />
              </v-col>
              <base-input
                v-if="p.invoice.hasInvoiceNumber"
                id="purchase-order-number"
                label="Purchase Order Number"
                v-model="p.invoice.purchaseOrderNumber"
              />
              <base-input
                id="project"
                label="Project"
                v-model="p.invoice.projectName"
              />
              <base-input
                id="remark"
                label="Remark"
                v-model="p.invoice.remark"
              />

              <v-col cols="12" sm="6">
                <v-select
                  v-model="p.invoice.currency"
                  :items="p.invoice.getCurrencies()"
                  label="Currency"
                ></v-select>
              </v-col>

              <base-input
                id="payment"
                label="Payment"
                v-model="p.invoice.payment"
              />
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
          <tr v-for="(item, index) in p.invoice.getItems()" :key="index">
            <td class="text-left">
              <v-text-field label="Item" v-model="item.name" />
            </td>
            <td class="text-right">
              <v-text-field label="Price" v-model="item.price" />
            </td>
            <td class="text-right">
              <v-text-field label="Amount" v-model="item.amount" />
            </td>
            <td class="text-right">{{ item.getTotal() }}</td>
            <td class="text-right">
              <button
                class="action-button small green add-item"
                @click="addItem(item)"
                title="Add Item"
              >
                <span class="icon">⇧</span>
              </button>
              <button
                class="action-button small red remove-item"
                @click="removeItem(item)"
                title="Remove Item"
              >
                <span class="icon">✖</span>
              </button>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import Presenter from "@/presenters/Invoice";
import BaseInput from "@/components/BaseInput.vue";

export default {
  name: "editInvoice",
  props: { presenter: Presenter },
  components: { BaseInput },
  mounted() {
    this.p = this.presenter;
  },
  data() {
    return {
      p: this.p,
    };
  },
  methods: {
    today: function () {
      this.p.todayClicked();
    },
    addItem: function (item) {
      this.p.addItemClickedOn(item);
    },
    removeItem: function (item) {
      this.p.removeItemClickedOn(item);
    },
  },
};
</script>
<style scoped>
h2 {
  font-weight: 500;
}

.action-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
  align-items: center;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  justify-content: center;
  margin: 4px;
  transition: background-color 0.2s;
}

.action-button.small {
  width: 40px;
  height: 40px;
}

.action-button.primary {
  background-color: var(--primary-color, #1976d2);
}

.action-button.green {
  background-color: var(--success-color, #4caf50);
}

.action-button.red {
  background-color: var(--error-color, #ff5252);
}

.action-button:hover {
  opacity: 0.8;
}

.action-button .icon {
  font-size: 1.2em;
}

.action-button.small .icon {
  font-size: 1em;
}
</style>
