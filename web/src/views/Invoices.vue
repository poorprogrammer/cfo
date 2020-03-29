<template>
  <div>
    <InvoiceList titleMsg="Invoice List" />
  </div>
</template>

<script>
// @ is an alias to /src
import InvoiceList from '@/components/InvoiceList.vue'

export default {
  name: 'invoices',
  components: {
    InvoiceList
  }
}
</script>
