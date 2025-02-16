<template>
  <update-billing-document v-bind:presenter="p" />
</template>

<script>
import Presenter from "@/presenters/InvoicePresenter";
import UpdateBillingDocument from "@/components/UpdateBillingDocument.vue";
import API from "@/services/InvoiceService";

export default {
  components: { UpdateBillingDocument },
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
