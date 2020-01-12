<template>
  <div class="home">
    <InvoiceList msg="Invoice List" />
  </div>
</template>

<script>
// @ is an alias to /src
import InvoiceList from '@/components/InvoiceList.vue'

export default {
  name: 'home',
  components: {
    InvoiceList
  }
}
</script>
