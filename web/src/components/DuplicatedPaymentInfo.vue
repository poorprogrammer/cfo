
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
  name: 'DuplicatedPaymentInfo',
  mounted() {
    this.p = this.presenter;
  },
  data() {
    return {
      p: this.p
    }
  },
  methods: {
    save: function() { this.p.save() },
  }
}
</script>
<style scoped>
a.back-btn {
  text-decoration: none;
}
</style>
