<template>
  <v-col cols="12" sm="6">
    <v-text-field :id="id" :label="label" :value="value" @input="$emit('input', $event)" />
  </v-col>
</template>
<script setup lang="ts">
const props = defineProps({
  id: String,
  label: String,
  value: String,
})
</script>
