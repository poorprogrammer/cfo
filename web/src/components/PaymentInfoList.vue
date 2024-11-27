<template>
  <div>
    <v-card>
      <v-card-title>{{ titleMsg }} <slot name="header"></slot></v-card-title>
      <data-table
        :headers="p.headers"
        :items="p.items"
        :sort-by="p.sortBy()"
        :sort-desc="p.sortDesc()"
      >
        <template #[`item.number`]="{ item }">
          <slot name="col1" v-bind:item="item"></slot>
          <router-link :to="item.editionUrl()">{{ item.number }}</router-link>
        </template>

        <template #[`item.action`]="{ item }">
          <router-link :to="item.duplicationUrl()">
            <button
              :id="'duplicate_' + item.number"
              class="action-button"
              title="Duplicate"
            >
              <span class="icon">📋</span>
            </button>
          </router-link>

          <router-link :to="item.url()">
            <button
              :id="'print_' + item.number"
              class="action-button"
              title="Print"
            >
              <span class="icon">🖨</span>
            </button>
          </router-link>

          <button
            :id="'delete_' + item.number"
            class="action-button delete"
            @click="confirmDelete(item)"
            title="Delete"
          >
            <span class="icon">🗑</span>
          </button>

          <div
            v-if="showDeleteDialog && selectedItem === item"
            class="dialog-overlay"
          >
            <div class="dialog">
              <h3>Delete this {{ item.documentType.toLowerCase() }}?</h3>
              <p>
                This action will mark the
                {{ item.documentType.toLowerCase() }} as deleted. A deleted
                {{ item.documentType.toLowerCase() }} will be excluded from the
                list.
              </p>
              <div class="dialog-actions">
                <button @click="cancelDelete">Cancel</button>
                <button class="delete-btn" @click="confirmDeleteAction(item)">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </template>
      </data-table>
    </v-card>
  </div>
</template>

<script>
import Presenter from "@/presenters/InvoiceList";
import DataTable from "./DataTable.vue";

export default {
  name: "PaymentInfoList",
  components: {
    DataTable,
  },
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
      showDeleteDialog: false,
      selectedItem: null,
    };
  },
  methods: {
    confirmDelete(item) {
      this.selectedItem = item;
      this.showDeleteDialog = true;
    },
    cancelDelete() {
      this.showDeleteDialog = false;
      this.selectedItem = null;
    },
    confirmDeleteAction(item) {
      this.p.delete(item);
      this.showDeleteDialog = false;
      this.selectedItem = null;
    },
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

.action-button {
  padding: 8px;
  margin: 0 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color, #1976d2);
  transition: opacity 0.2s;
}

.action-button:hover {
  opacity: 0.8;
}

.action-button.delete {
  color: var(--error-color, #ff5252);
}

.icon {
  font-size: 1.2em;
  line-height: 1;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.dialog h3 {
  margin-top: 0;
  color: rgba(0, 0, 0, 0.87);
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 8px;
}

.dialog-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  background: none;
  color: var(--primary-color, #1976d2);
}

.dialog-actions .delete-btn {
  color: var(--error-color, #ff5252);
}

.dialog-actions button:hover {
  background: rgba(0, 0, 0, 0.04);
}
</style>
