<template>
  <div>
    <v-card>
      <v-card-title>{{ titleMsg }}</v-card-title>
      <v-data-table
        :headers="p.headers"
        :items="p.invoices"
        :sort-by="p.sortBy()"
        :sort-desc="p.sortDesc()"
        :hide-default-footer="true"
        :disable-pagination="true"
      >
        <template v-slot:item.invoiceNumber="{ item }">
          <router-link :to="item.url()">{{ item.invoiceNumber }}</router-link>
        </template>

        <template v-slot:item.action="{ item }">
          <router-link :to="item.duplicationUrl()">
            <v-btn
              :id="'duplicate_' + item.invoiceNumber"
              text
              small
              color="primary"
              >duplicate</v-btn
            >
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Presenter from "@/presenters/InvoiceList";

export default {
  name: "InvoiceList",
  props: {
    titleMsg: String,
  },
  mounted() {
    let year = this.$route.params.year || new Date().getFullYear();
    this.p.init(year);
  },
  data() {
    return {
      p: new Presenter(this),
    };
  },
};
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
