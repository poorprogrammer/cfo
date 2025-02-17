<template>
  <update-payment-info v-bind:presenter="p" />
</template>

<script>
import Presenter from "@/presenters/Invoice";
import UpdatePaymentInfo from "@/components/UpdatePaymentInfo.vue";
import API from "@/services/InvoiceService";

export default {
  components: { UpdatePaymentInfo },
  name: "updateInvoice",
  data() {
    return {
      p: new Presenter(this, new API()),
    };
  },
  methods: {
    goTo: function (path) {
      this.$router.push(path);
    },
  },
};
</script>
