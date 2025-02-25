<template>
  <duplicated-billing-document v-bind:presenter="p" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Presenter from "../presenters/BillingDocumentPresenter";
import DuplicatedBillingDocument from "../components/DuplicatedBillingDocument.vue";
import API from "../services/InvoiceService";
import Invoice from "../models/Invoice";

const route = useRoute();
const router = useRouter();
const p = ref(
  new Presenter(
    {
      goTo: (path) => router.push(path),
    },
    new API(),
    Invoice
  )
);

onMounted(async () => {
  const number = route.params.number as string;
  await p.value.init(number);
});
</script>
