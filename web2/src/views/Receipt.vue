<template>
  <print-billing-document v-bind:presenter="p"></print-billing-document>
</template>

<script setup lang="ts">
import Presenter from "@/presenters/BillingDocumentPresenter";
import PrintBillingDocument from "@/components/PrintBillingDocument.vue";
import API from "@/services/ReceiptService";
import { ref } from "vue";
import Receipt from "@/models/Receipt";

const p = ref(new Presenter<Receipt>({}, new API(), Receipt));
</script>
