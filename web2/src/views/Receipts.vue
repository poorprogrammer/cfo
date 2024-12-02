<template>
  <div>
    <payment-info-list titleMsg="Receipt List" :presenter="presenter" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PaymentInfoList from "@/components/PaymentInfoList.vue";
import Presenter from "@/presenters/PaymentInfoList";
import API from "@/services/ReceiptService";

const presenter = ref(new Presenter(new API()));
</script>
