<template>
  <div class="data-table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            @click="handleSort(header.value)"
            :class="{
              sortable: header.sortable !== false,
              'sorted-asc': sortBy === header.value && !sortDesc,
              'sorted-desc': sortBy === header.value && sortDesc,
            }"
          >
            {{ header.text }}
            <span v-if="header.sortable !== false" class="sort-icon">
              {{ getSortIcon(header.value) }}
            </span>
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

<script>
export default {
  name: "DataTable",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    sortBy: {
      type: String,
      default: "number",
    },
    sortDesc: {
      type: Boolean,
      default: true,
    },
    hideFooter: {
      type: Boolean,
      default: true,
    },
    disablePagination: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getItemValue(item, path) {
      return path.split(".").reduce((obj, key) => obj?.[key], item);
    },
    handleSort(column) {
      if (column === this.sortBy) {
        this.$emit("update:sortDesc", !this.sortDesc);
      } else {
        this.$emit("update:sortBy", column);
        this.$emit("update:sortDesc", false);
      }
    },
    getSortIcon(column) {
      if (column !== this.sortBy) return "↕";
      return this.sortDesc ? "↓" : "↑";
    },
  },
  computed: {
    sortedItems() {
      return [...this.items].sort((a, b) => {
        const aVal = this.getItemValue(a, this.sortBy) || "";
        const bVal = this.getItemValue(b, this.sortBy) || "";

        // Handle numeric values
        if (!isNaN(aVal) && !isNaN(bVal)) {
          return this.sortDesc ? bVal - aVal : aVal - bVal;
        }

        // Handle string values
        return this.sortDesc
          ? bVal.toString().localeCompare(aVal.toString())
          : aVal.toString().localeCompare(bVal.toString());
      });
    },
  },
};
</script>

<style scoped>
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
}

.data-table th {
  text-align: left;
  padding: 16px 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  white-space: nowrap;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.data-table th.sortable:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.sort-icon {
  display: inline-block;
  margin-left: 4px;
  opacity: 0.5;
}

th.sorted-asc .sort-icon,
th.sorted-desc .sort-icon {
  opacity: 1;
  color: #1976d2;
}

.data-table td {
  padding: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
}

.data-table tbody tr {
  transition: background-color 0.2s;
}

.data-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

/* Responsive design */
@media (max-width: 600px) {
  .data-table th,
  .data-table td {
    padding: 8px;
    font-size: 0.813rem;
  }
}

/* Print styles */
@media print {
  .data-table-wrapper {
    box-shadow: none;
  }

  .data-table th,
  .data-table td {
    padding: 8px;
  }

  .sort-icon {
    display: none;
  }

  .data-table tbody tr:hover {
    background-color: transparent;
  }
}
</style>
