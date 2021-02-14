<template>
  <div class="invoice pa-3">
    <div v-if="!p.invoice.number">Loading Please wait...</div>
    <div v-else>
      <edit-invoice v-bind:presenter="p"></edit-invoice>
      <div class="no-print">
        <back-button></back-button>
        <v-btn id="save-button" @click="save" class="mx-1" fab dark color="primary">
          <v-icon dark>mdi-content-save</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Presenter from '@/presenters/Invoice'
import EditInvoice from '@/components/EditInvoice.vue'
import BackButton from '@/components/BackButton.vue'

export default {
  props: { presenter: Presenter },
  components: { EditInvoice, BackButton },
  name: 'UpdatePaymentInfo',
  mounted() {
    this.p = this.presenter
    this.p.init(this.$route.params.number)
  },
  data() {
    return {
      p: this.p
    }
  },
  methods: {
    save: function() { this.p.update() },
  }
}
</script>