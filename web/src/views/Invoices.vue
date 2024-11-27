<template>
  <div>
    <payment-info-list titleMsg="Invoice List" v-bind:presenter="p">
      <template v-slot:header>
        <button
          id="generate-receipt"
          class="icon-button"
          :class="p.buttonColor"
          @click="p.toggleGenerateReceipt()"
        >
          <span class="icon">≡</span>
        </button>
      </template>
      <template v-slot:col1="slotProps">
        <span class="selecting-invoices" v-if="p.isGeneratingReceipt">
          <input
            type="checkbox"
            v-model="p.selectedInvoices"
            :value="slotProps.item"
          />
        </span>
      </template>
    </payment-info-list>
  </div>
</template>

<script>
// @ is an alias to /src
import PaymentInfoList from "@/components/PaymentInfoList.vue";
import Presenter from "@/presenters/InvoiceList";
import API from "@/services/InvoiceService";

export default {
  name: "InvoicesView",
  components: { PaymentInfoList },
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

<style scoped>
.icon-button {
  padding: 8px;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 0.5em;
}

.icon-button:hover {
  opacity: 0.8;
}

.selecting-invoices {
  padding-right: 0.5em;
}
</style>
