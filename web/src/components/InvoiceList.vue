<template>
  <div>
    <v-card>
      <v-card-title>
        {{titleMsg}}
        <v-card-actions>
          <v-btn fab color="green" center right absolute>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card-title>
      <v-data-table :headers="p.headers" :items="p.invoices" :items-per-page="5"></v-data-table>
    </v-card>
  </div>
</template>

<script>
import Presenter from '@/presenters/invoicelistpresenter'

export default {
  name: 'InvoiceList',
  props: {
    titleMsg: String
  },
  mounted() {
    this.p.init()
  },
  data() {
    return {
      p: new Presenter(this)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
