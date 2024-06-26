<template>
  <div>
    <v-card>
      <v-card-title>{{ titleMsg }} <slot name="header"></slot></v-card-title>
      <v-data-table
        :headers="p.headers"
        :items="p.items"
        :sort-by="p.sortBy()"
        :sort-desc="p.sortDesc()"
        :hide-default-footer="true"
        :disable-pagination="true">
        <template v-slot:[`item.number`]="{ item }">
          <slot name="col1" v-bind:item="item"></slot>
          <router-link :to="item.editionUrl()">{{ item.number }}</router-link>
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <router-link :to="item.duplicationUrl()">
            <v-btn :id="'duplicate_' + item.number" text small color="primary">
              <v-icon dark>mdi-content-duplicate</v-icon>
            </v-btn>
          </router-link>

          <router-link :to="item.url()">
            <v-btn :id="'print_' + item.number" text small color="primary">
              <v-icon dark>mdi-printer</v-icon>
            </v-btn>
          </router-link>

          <v-dialog v-model="item.dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                v-bind="attrs"
                v-on="on"
                :id="'delete_' + item.number"
                text
                small
                color="primary">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">
                Delete this {{ item.documentType.toLowerCase() }}?
              </v-card-title>
              <v-card-text>
                This action will mark the
                {{ item.documentType.toLowerCase() }} as deleted. A deleted
                {{ item.documentType.toLowerCase() }} will be excluded from the
                list.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click="p.cancelDelete(item)">
                  Cancel
                </v-btn>
                <v-btn
                  class="confirm-delete-btn"
                  color="red darken-1"
                  text
                  @click="p.delete(item)">
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
  name: "PaymentInfoList",
  props: {
    titleMsg: String,
    presenter: Presenter,
  },
  mounted() {
    let year = this.$route.params.year || new Date().getFullYear();
    this.p = this.presenter;
    this.p.init(year);
  },
  data() {
    return {
      p: this.p,
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
