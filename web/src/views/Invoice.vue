<template>
  <print-billing-document v-bind:presenter="p" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Presenter from "../presenters/BillingDocumentPresenter";
import PrintBillingDocument from "../components/PrintBillingDocument.vue";
import API from "../services/InvoiceService";
import Invoice from "../models/Invoice";

const p = ref(new Presenter({}, new API(), Invoice));
</script>
