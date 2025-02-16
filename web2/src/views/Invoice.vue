<template>
  <print-billing-document v-bind:presenter="p" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Presenter from "@/presenters/InvoicePresenter";
import PrintBillingDocument from "@/components/PrintBillingDocument.vue";
import API from "@/services/InvoiceService";

const p = ref(new Presenter({}, new API()));
</script>
