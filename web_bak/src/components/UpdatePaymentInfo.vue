<template>
  <div class="invoice pa-3">
    <div v-if="!p.invoice.number">Loading Please wait...</div>
    <div v-else>
      <edit-invoice v-bind:presenter="p"></edit-invoice>
      <div class="no-print">
        <back-button v-bind:target="p.invoice.listUrl"></back-button>
        <save-button @save="save"></save-button>
      </div>
    </div>
  </div>
</template>

<script>
import Presenter from "@/presenters/Invoice";
import EditInvoice from "@/components/EditInvoice.vue";
import BackButton from "@/components/BackButton.vue";
import SaveButton from "@/components/SaveButton.vue";

export default {
  props: { presenter: Presenter },
  components: { EditInvoice, BackButton, SaveButton },
  name: "UpdatePaymentInfo",
  mounted() {
    this.p = this.presenter;
    this.p.init(this.$route.params.number);
  },
  data() {
    return {
      p: this.p,
    };
  },
  methods: {
    save: function () {
      this.p.update();
    },
  },
};
</script>
