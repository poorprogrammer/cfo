<template>
  <div>
    <billing-archive titleMsg="Quotation List" :presenter="presenter" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BillingArchive from "@/components/BillingArchive.vue";
import QuotationArchivePresenter from "@/presenters/QuotationArchivePresenter";
import QuotationService from "@/services/QuotationService";

const presenter = ref(
  new QuotationArchivePresenter(undefined, new QuotationService())
);
</script>
