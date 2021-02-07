<template>
  <div>
    <invoice-list titleMsg="Invoice List"  v-bind:presenter="p"/>
  </div>
</template>

<script>
// @ is an alias to /src
import InvoiceList from '@/components/InvoiceList.vue'
import Presenter from "@/presenters/InvoiceList";
import API from '@/services/invoices'

export default {
  name: 'invoices',
  components: { InvoiceList },
  data() {
    return {
      p: new Presenter(this, new API()),
    }
  },
}
</script>
