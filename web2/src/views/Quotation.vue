<template>
  <print-billing-document v-bind:presenter="p"></print-billing-document>
</template>

<script setup lang="ts">
import Presenter from "@/presenters/BillingDocumentPresenter";
import PrintBillingDocument from "@/components/PrintBillingDocument.vue";
import API from "@/services/QuotationService";
import { ref } from "vue";
import Quotation from "@/models/Quotation";

const p = ref(new Presenter<Quotation>({}, new API(), Quotation));
</script>
