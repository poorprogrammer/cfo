<template>
  <div>
    <billing-archive titleMsg="Receipt List" :presenter="presenter" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BillingArchive from "../components/BillingArchive.vue";
import ReceiptArchivePresenter from "../presenters/ReceiptArchivePresenter";
import { ReceiptService } from "../services/ReceiptService";

const presenter = ref(
  new ReceiptArchivePresenter(undefined, new ReceiptService())
);
</script>
