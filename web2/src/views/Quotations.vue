<template>
  <div>
    <payment-info-list titleMsg="Quotation List" :presenter="presenter" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PaymentInfoList from "@/components/PaymentInfoList.vue";
import Presenter from "@/presenters/BillingArchivePresenter";
import API from "@/services/QuotationService";

const presenter = ref(new Presenter(new API()));
</script>
