<template>
  <duplicated-payment-info v-bind:presenter="p" />
</template>

<script>
import Presenter from "@/presenters/InvoicePresenter";
import DuplicatedPaymentInfo from "@/components/DuplicatedPaymentInfo.vue";
import API from "@/services/QuotationService";

export default {
  components: { DuplicatedPaymentInfo },
  name: "duplicatedQuotation",
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
