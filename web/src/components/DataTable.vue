<template>
  <div class="data-table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            @click="handleSort(header.value)"
            :class="{ sortable: header.sortable !== false }"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedItems" :key="item.id">
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
      // Implement sorting logic here
    },
  },
  computed: {
    sortedItems() {
      // Implement sorting of items based on sortBy and sortDesc
      return [...this.items].sort((a, b) => {
        const aVal = this.getItemValue(a, this.sortBy);
        const bVal = this.getItemValue(b, this.sortBy);
        return this.sortDesc
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      });
    },
  },
};
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 12px;
}

.data-table th.sortable {
  cursor: pointer;
}

.data-table td {
  padding: 12px;
  border-top: 1px solid #ddd;
}
</style>
