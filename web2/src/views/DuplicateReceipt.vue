<template>
  <duplicated-billing-document v-bind:presenter="p" />
</template>

<script setup lang="ts">
import Presenter from "@/presenters/BillingDocumentPresenter";
import DuplicatedBillingDocument from "@/components/DuplicatedBillingDocument.vue";
import { ReceiptService as API } from "@/services/ReceiptService";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Receipt from "@/models/Receipt";

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
  const number = route.params.number as string;
  await p.value.init(number);
});
</script>
