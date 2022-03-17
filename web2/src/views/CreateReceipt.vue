<template>
  <duplicated-payment-info v-bind:presenter="p" />
</template>

<script>
import Presenter from "@/presenters/Invoice";
import DuplicatedPaymentInfo from "@/components/DuplicatedPaymentInfo.vue";
import API from "@/services/receipts";
import Receipt from "@/models/Receipt";

export default {
  components: { DuplicatedPaymentInfo },
  name: "createReceipt",
  mounted() {
    this.p.invoice = Receipt.createFromInvoices(this.$route.params.invoices);
  },
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
