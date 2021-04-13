<template>
  <div>
    <payment-info-list titleMsg="Invoice List"  v-bind:presenter="p">
      <template v-slot:header>
        <v-btn
          id="generate-receipt"
          text
          small
          :color="p.buttonColor"
          v-on:click="p.toggleGenerateReceipt()"
        >
          <v-icon dark>mdi-forwardburger</v-icon>
        </v-btn>
      </template>
      <template v-slot:col1="slotProps">
        <span class="selecting-invoices"
          v-if="p.isGeneratingReceipt">
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
import PaymentInfoList from '@/components/PaymentInfoList.vue'
import Presenter from "@/presenters/InvoiceList";
import API from '@/services/invoices'

export default {
  name: 'invoices',
  components: { PaymentInfoList },
  data() {
    return {
      p: new Presenter(this, new API()),
    }
  },
  methods: {
    goTo: function(path) { this.$router.push(path) }
  }
}
</script>

<style scoped>
.selecting-invoices {
  padding-right: 0.5em;
}
</style>