<template>
  <duplicated-payment-info v-bind:presenter="p" />
</template>

<script>
import Presenter from "@/presenters/Invoice";
import DuplicatedPaymentInfo from "@/components/DuplicatedPaymentInfo.vue";
import API from "@/services/InvoiceService";

export default {
  components: { DuplicatedPaymentInfo },
  name: "duplicatedInvoice",
  mounted() {
    this.p.init(this.$route.params.number);
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
