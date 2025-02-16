<template>
  <print-billing-document v-bind:presenter="p"></print-billing-document>
</template>

<script setup lang="ts">
import Presenter from "@/presenters/InvoicePresenter";
import PrintBillingDocument from "@/components/PrintBillingDocument.vue";
import API from "@/services/QuotationService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const p = ref(new Presenter({}, new API()));

onMounted(async () => {
  const invoiceNumber = route.params.number as string;
  await p.value.init(invoiceNumber);
});
</script>
