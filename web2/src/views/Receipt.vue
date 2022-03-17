<template>
  <print-payment-info v-bind:presenter="p"></print-payment-info>
</template>

<script>
import Presenter from "@/presenters/Invoice";
import PrintPaymentInfo from "@/components/PrintPaymentInfo.vue";
import API from "@/services/receipts";

export default {
  components: { PrintPaymentInfo },
  name: "ReceiptView",
  data() {
    return {
      p: new Presenter(this, new API()),
    };
  },
};
</script>
