<template>
  <print-payment-info v-bind:presenter="p" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Presenter from "@/presenters/Invoice";
import PrintPaymentInfo from "@/components/PrintPaymentInfo.vue";
import API from "@/services/InvoiceService";

const route = useRoute();
const p = ref(new Presenter({}, new API()));

onMounted(async () => {
  const invoiceNumber = route.params.number as string;
  await p.value.init(invoiceNumber);
});
</script>
