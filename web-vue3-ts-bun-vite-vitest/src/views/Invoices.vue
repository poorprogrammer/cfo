<template>
  <div>
    <payment-info-list titleMsg="Invoice List" v-bind:presenter="invoiceListPresenter">
      <template v-slot:header>
        <v-btn id="generate-receipt"  small :color="invoiceListPresenter.buttonColor" v-on:click="invoiceListPresenter.toggleGenerateReceipt()">
          convert to receipt
        </v-btn>
      </template>
      <template v-slot:col1="slotProps">
        <span class="selecting-invoices" v-if="invoiceListPresenter.isGeneratingReceipt">
          <input type="checkbox" v-model="invoiceListPresenter.selectedInvoices" :value="slotProps.item" />
        </span>
      </template>
    </payment-info-list>
  </div>
</template>

<script setup lang="ts">
// @ is an alias to /src
import PaymentInfoList from "@/components/PaymentInfoList.vue";
import Presenter from "@/presenters/InvoiceList";
import API from "@/services/InvoiceService";
import { useRouter } from "vue-router";
const invoiceListPresenter = new Presenter(this, new API());
const router = useRouter();

function goTo(path: string) {
  router.push(path);
}
</script>

<style scoped>
.selecting-invoices {
  padding-right: 0.5em;
}
</style>
