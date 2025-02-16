<template>
  <print-billing-document v-bind:presenter="p"></print-billing-document>
</template>

<script setup lang="ts">
import Presenter from "@/presenters/BillingDocumentPresenter";
import PrintBillingDocument from "@/components/PrintBillingDocument.vue";
import API from "@/services/QuotationService";
import { ref } from "vue";

const p = ref(new Presenter({}, new API()));
</script>
