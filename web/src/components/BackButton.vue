<template>
    <router-link to="/invoices" class="back-btn">
        <v-btn id="back-button" class="mx-1" fab dark color="accent">
        <v-icon dark>mdi-arrow-left-circle</v-icon>
        </v-btn>
    </router-link>
</template>
<script>
export default {
  name: "backButton",
}
</script>
<style scoped>
a.back-btn {
  text-decoration: none;
}
</style>
