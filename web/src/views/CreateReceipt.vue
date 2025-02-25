<template>
  <duplicated-billing-document v-bind:presenter="p" />
</template>

<script setup lang="ts">
import Presenter from "../presenters/BillingDocumentPresenter";
import DuplicatedBillingDocument from "../components/DuplicatedBillingDocument.vue";
import { ReceiptService as API } from "../services/ReceiptService";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Receipt, { ReceiptData } from "../models/Receipt";

const route = useRoute();
const router = useRouter();
const p = ref(
  new Presenter(
    {
      goTo: (path) => router.push(path),
    },
    new API(),
    Receipt
  )
);

onMounted(async () => {
  const receiptStr = route.query.receipt as string;
  const receipt = new Receipt(JSON.parse(receiptStr) as ReceiptData);
  if (!receipt) {
    router.push("/invoices");
    return;
  }
  p.value.billingDocument = receipt;
});
</script>
