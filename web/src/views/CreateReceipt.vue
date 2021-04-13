<template>
  <duplicated-payment-info v-bind:presenter="p"/>
</template>

<script>
import Presenter from '@/presenters/Invoice'
import DuplicatedPaymentInfo from '@/components/DuplicatedPaymentInfo.vue'
import API from '@/services/receipts'
import Receipt from '@/models/Receipt'

export default {
  components: { DuplicatedPaymentInfo },
  name: 'createReceipt',
  mounted() {
    this.p.invoice = new Receipt()
    this.p.invoice.number = '202101-001'
  },
  data() {
    return {
      p: new Presenter(this, new API())
    }
  },
  methods: {
    goTo: function(path) { this.$router.push(path) }
  }
}
</script>