<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
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
