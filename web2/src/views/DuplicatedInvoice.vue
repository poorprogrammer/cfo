<template>
  <duplicated-payment-info v-bind:presenter="p" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Presenter from "@/presenters/Invoice";
import DuplicatedPaymentInfo from "@/components/DuplicatedPaymentInfo.vue";
import API from "@/services/InvoiceService";

const route = useRoute();
const router = useRouter();
const p = ref(
  new Presenter(
    {
      goTo: (path) => router.push(path),
    },
    new API()
  )
);

onMounted(async () => {
  const invoiceNumber = route.params.number as string;
  await p.value.init(invoiceNumber);
});
</script>
