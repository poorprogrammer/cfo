<template>
  <update-billing-document v-bind:presenter="p" />
</template>

<script>
import Presenter from "@/presenters/BillingDocumentPresenter";
import UpdateBillingDocument from "@/components/UpdateBillingDocument.vue";
import API from "@/services/InvoiceService";
import Invoice from "@/models/Invoice";

export default {
  components: { UpdateBillingDocument },
  name: "updateInvoice",
  data() {
    return {
      p: new Presenter(this, new API(), Invoice),
    };
  },
  methods: {
    goTo: function (path) {
      this.$router.push(path);
    },
  },
};
</script>
