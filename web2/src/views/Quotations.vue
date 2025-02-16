<template>
  <div>
    <billing-archive titleMsg="Quotation List" :presenter="presenter" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BillingArchive from "@/components/BillingArchive.vue";
import Presenter from "@/presenters/BillingArchivePresenter";
import API from "@/services/QuotationService";

const presenter = ref(new Presenter(new API()));
</script>
