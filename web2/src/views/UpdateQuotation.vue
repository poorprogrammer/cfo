<template>
  <update-billing-document v-bind:presenter="p" />
</template>

<script>
import Presenter from "@/presenters/BillingDocumentPresenter";
import UpdateBillingDocument from "@/components/UpdateBillingDocument.vue";
import API from "@/services/QuotationService";

export default {
  components: { UpdateBillingDocument },
  name: "UpdateQuotation",
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
