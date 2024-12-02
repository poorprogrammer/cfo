<template>
  <div>
    <div class="list-card">
      <div class="card-header">{{ titleMsg }} <slot name="header"></slot></div>
      <data-table :headers="presenter.headers" :items="presenter.items">
        <template #[`item.number`]="{ item }">
          <slot name="col1" :item="item"></slot>
          <router-link :to="item.editionUrl()">{{ item.number }}</router-link>
        </template>

        <template #[`item.action`]="{ item }">
          <router-link :to="item.duplicationUrl()">
            <button
              :id="'duplicate_' + item.number"
              class="action-button small"
              title="Duplicate"
            >
              <span class="icon">📋</span>
            </button>
          </router-link>

          <router-link :to="item.url()">
            <button
              :id="'print_' + item.number"
              class="action-button small"
              title="Print"
            >
              <span class="icon">🖨</span>
            </button>
          </router-link>

          <button
            :id="'delete_' + item.number"
            class="action-button small delete"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import DataTable from "./DataTable.vue";

interface PaymentInfoItem {
  number: string;
  documentType: string;
  editionUrl(): string;
  duplicationUrl(): string;
  url(): string;
}

interface Presenter {
  headers: Array<{ text: string; value: string }>;
  items: PaymentInfoItem[];
  init(year: string): void;
  delete(item: PaymentInfoItem): void;
}

const props = defineProps<{
  titleMsg: string;
  presenter: Presenter;
}>();

const route = useRoute();
const showDeleteDialog = ref(false);
const selectedItem = ref<PaymentInfoItem | null>(null);

onMounted(() => {
  const year =
    route.params.year?.toString() || new Date().getFullYear().toString();
  props.presenter.init(year);
});

const confirmDelete = (item: PaymentInfoItem) => {
  selectedItem.value = item;
  showDeleteDialog.value = true;
};

const cancelDelete = () => {
  showDeleteDialog.value = false;
  selectedItem.value = null;
};

const confirmDeleteAction = (item: PaymentInfoItem) => {
  props.presenter.delete(item);
  showDeleteDialog.value = false;
  selectedItem.value = null;
};
</script>

<style scoped lang="scss">
.list-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.card-header {
  padding: 16px;
  font-size: 1.25rem;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-button {
  padding: 8px;
  margin: 0 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color, #1976d2);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &.delete {
    color: var(--error-color, #ff5252);
  }
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

  h3 {
    margin-top: 0;
    color: rgba(0, 0, 0, 0.87);
  }
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 8px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    background: none;
    color: var(--primary-color, #1976d2);

    &.delete-btn {
      color: var(--error-color, #ff5252);
    }

    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
