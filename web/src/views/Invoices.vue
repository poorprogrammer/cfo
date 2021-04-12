<template>
  <div>
    <payment-info-list titleMsg="Invoice List"  v-bind:presenter="p">
      <v-btn
        id="generate-receipt"
        text
        small
        color="purple"
        v-on:click="toggleGenerateReceipt(item)"
      >
        <v-icon dark>mdi-forwardburger</v-icon>
      </v-btn>
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
}
</script>
