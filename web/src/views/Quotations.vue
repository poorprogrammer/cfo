<template>
  <div>
    <invoice-list titleMsg="Quotation List"  v-bind:presenter="p"/>
  </div>
</template>

<script>
// @ is an alias to /src
import InvoiceList from '@/components/InvoiceList.vue'
import Presenter from "@/presenters/InvoiceList";
import API from '@/services/quotations'

export default {
  name: 'quotations',
  components: { InvoiceList },
  data() {
    return {
      p: new Presenter(this, new API()),
    }
  },
}
</script>
