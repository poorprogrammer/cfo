<template>
  <v-col cols="12">
    <v-text-field
      :id="id"
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
    />
  </v-col>
</template>
<script>
export default {
  name: "baseInput",
  props: ["id", "label", "value"],
};
</script>
