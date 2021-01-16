<template>
  <div class="invoice pa-3">
    <div v-if="!p.invoice.invoiceNumber">Loading Please wait...</div>
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
  components: { EditInvoice, BackButton },
  name: 'duplicatedInvoice',
  mounted() {
    this.p.init(this.$route.params.invoiceNumber)
  },
  data() {
    return {
      p: new Presenter(this)
    }
  },
  methods: {
    save: function() { this.p.save() },
    goTo: function(path) { this.$router.push(path) }
  }
}
</script>
<style scoped>
h2 {
  font-weight: 500;
}
a.back-btn {
  text-decoration: none;
}
</style>
