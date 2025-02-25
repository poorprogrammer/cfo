<template>
  <div class="data-table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.value">
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in sortedItems"
          :key="item.id"
          @click="$emit('click:row', item)"
        >
          <td v-for="header in headers" :key="header.value">
            <slot :name="`item.${header.value}`" v-bind="{ item }">
              {{ getItemValue(item, header.value) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import BillingDocument from "../models/BillingDocument";
import { computed } from "vue";

interface TableHeader {
  text: string;
  value: string;
}

const props = defineProps<{
  headers: TableHeader[];
  items: BillingDocument[];
  sortBy?: string;
  sortDesc?: boolean;
  hideFooter?: boolean;
  disablePagination?: boolean;
}>();

const emit = defineEmits<{
  (e: "click:row", item: BillingDocument): void;
}>();

const getItemValue = (item: BillingDocument, path: string): any => {
  return path.split(".").reduce((obj, key) => obj?.[key], item);
};

const sortedItems = computed(() => {
  if (!props.items?.length) {
    return [];
  }
  return [...props.items].sort((a, b) => {
    const aVal = a.number;
    const bVal = b.number;
    return bVal.toString().localeCompare(aVal.toString());
  });
});
</script>

<style scoped lang="scss">
.data-table-wrapper {
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Roboto", sans-serif;

  th {
    text-align: left;
    padding: 16px 12px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    white-space: nowrap;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.sortable {
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }

  td {
    padding: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.875rem;
  }

  tbody tr {
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }
  }
}

@media (max-width: 600px) {
  .data-table {
    th,
    td {
      padding: 8px;
      font-size: 0.813rem;
    }
  }
}

@media print {
  .data-table-wrapper {
    box-shadow: none;
  }

  .data-table {
    th,
    td {
      padding: 8px;
    }

    tbody tr:hover {
      background-color: transparent;
    }
  }
}
</style>
