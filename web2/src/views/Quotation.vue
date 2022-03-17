<template>
  <print-payment-info v-bind:presenter="p"></print-payment-info>
</template>

<script>
import Presenter from "@/presenters/Invoice";
import PrintPaymentInfo from "@/components/PrintPaymentInfo.vue";
import API from "@/services/quotations";

export default {
  components: { PrintPaymentInfo },
  name: "QuotationView",
  data() {
    return {
      p: new Presenter(this, new API()),
    };
  },
};
</script>
