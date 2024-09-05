<template>
  <div>
    <v-card>
      
    
      <v-card-title>{{ titleMsg }} <slot name="header"></slot></v-card-title>
      <v-data-table
        :headers="invoiceListPresenter.headers"
        :items="itemsRef"
        :sort-by="invoiceListPresenter.sortBy()"
        :sort-desc="invoiceListPresenter.sortDesc()"
        :hide-default-footer="true"
        :disable-pagination="true">
        <template v-slot:[`item.number`]="{ item }">
          <slot name="col1" v-bind:item="item"></slot>
          <router-link :to="item.editionUrl()">{{ item.number }}</router-link>
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <router-link :to="item.duplicationUrl()">
            <v-btn :id="'duplicate_' + item.number" small color="primary">
              duplicate
            </v-btn>
          </router-link>

          <router-link :to="item.url()">
            <v-btn :id="'print_' + item.number" small color="primary">
              print
            </v-btn>
          </router-link>

          <v-dialog v-model="item.dialog" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                v-bind="attrs"
                v-on="on"
                :id="'delete_' + item.number"
                small
                color="primary">
                delete
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
                <v-btn color="darken-1" text @click="invoiceListPresenter.cancelDelete(item)">
                  Cancel
                </v-btn>
                <v-btn
                  class="confirm-delete-btn"
                  color="red darken-1"
                  text
                  @click="invoiceListPresenter.delete(item)">
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

<script setup lang="ts">
import InvoiceListPresenter from "@/presenters/InvoiceList";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Invoice from "@/models/Invoice";

const route = useRoute();

const props = defineProps({
  titleMsg: String,
  presenter: InvoiceListPresenter
})

const invoiceListPresenter: InvoiceListPresenter = props.presenter;
const itemsRef = ref<Invoice[]>([]);

onMounted(() => {
  let year = route.params.year || new Date().getFullYear();
  invoiceListPresenter.init(year).then(() => {
    itemsRef.value = invoiceListPresenter.items;
  });
});

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
