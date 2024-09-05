<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
  <header>
    
      <div id="header" class="d-flex align-center">
        <RouterLink to="/">
          <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
        </RouterLink>
        <div class="text-md-h4">Automated Chief Financial Officers</div>
      </div>

      <!-- <v-spacer></v-spacer> -->

      <!-- <router-link to="/quotations">
        <v-btn id="quotation-list-btn" class="ma-2" outlined>
          <v-icon dark>mdi-format-quote-open</v-icon>
          <span class="list-btn-label">quotation</span>
        </v-btn>
      </router-link>
      <router-link to="/invoices">
        <v-btn id="invoice-list-btn" class="ma-2" outlined>
          <v-icon dark>mdi-file-document-outline</v-icon>
          <span class="list-btn-label">invoice</span>
        </v-btn>
      </router-link>
      <router-link to="/receipts">
        <v-btn id="receipt-list-btn" class="ma-2" outlined>
          <v-icon dark>mdi-currency-usd</v-icon>
          <span class="list-btn-label">receipt</span>
        </v-btn>
      </router-link> -->
    
  </header>
  <v-main>
    <RouterView />
  </v-main>
  </v-app>
</template>

<style>
#app_logo div.v-image__image {
  width: 90%;
  height: 90%;
}
@media (max-width: 600px) {
  .list-btn-label {
    display: none;
  }
}
</style>

