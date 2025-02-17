<template>
  <update-billing-document v-bind:presenter="p" />
</template>

<script>
import Presenter from "@/presenters/BillingDocumentPresenter";
import UpdateBillingDocument from "@/components/UpdateBillingDocument.vue";
import { ReceiptService as API } from "@/services/ReceiptService";
import Receipt from "@/models/Receipt";

export default {
  components: { UpdateBillingDocument },
  name: "updateReceipt",
  data() {
    return {
      p: new Presenter(this, new API(), Receipt),
    };
  },
  methods: {
    goTo: function (path) {
      this.$router.push(path);
    },
  },
};
</script>
