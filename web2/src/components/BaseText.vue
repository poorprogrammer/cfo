<template>
  <div class="invoice-meta" v-if="value">
    <div class="invoice-meta-item">
      <span class="invoice-meta-label">{{ label }}</span>
      <span class="invoice-meta-value">{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "baseText",
  props: ["value", "label"],
};
</script>

<style>
.invoice-meta {
  display: grid;
  grid-template-columns: auto auto;
  gap: 24px;
  text-align: left;
}
.invoice-meta-item {
  display: flex;
  flex-direction: column;
}

.invoice-meta-label {
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.invoice-meta-value {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}
</style>
