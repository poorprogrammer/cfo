<template>
  <v-col v-if="value" cols="12" sm="6">
    <v-row dense>
      <v-col>
        <span class="font-weight-bold">{{label}}</span>
      </v-col>
      <v-col>
        {{ value }}
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
    name: "baseText",
    props: ['value', 'label']
}
</script>