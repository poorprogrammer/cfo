<template>
    <router-link v-bind:to="target" class="back-btn">
        <v-btn id="back-button" class="mx-1" fab dark color="accent">
        <v-icon dark>mdi-arrow-left-circle</v-icon>
        </v-btn>
    </router-link>
</template>
<script>
export default {
  name: "backButton",
  props: ["target"],
}
</script>
<style scoped>
a.back-btn {
  text-decoration: none;
}
</style>
