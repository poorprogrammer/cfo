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

          <v-dialog v-model="item.dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                v-bind="attrs"
                v-on="on"
                :id="'delete_' + item.invoiceNumber"
                text
                small
                color="primary"
                >delete</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="headline">
                Delete this invoice?
              </v-card-title>
              <v-card-text
                >This action will mark the invoice as deleted. A deleted invoice
                will be excluded from the list.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click="p.cancelDelete(item)">
                  Cancel
                </v-btn>
                <v-btn class="confirm-delete-btn" color="red darken-1" text @click="p.delete(item)">
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
