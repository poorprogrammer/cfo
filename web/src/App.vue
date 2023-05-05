<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div id="header" class="d-flex align-center">
        <router-link to="/">
          <v-img
            id="app_logo"
            alt="Automated Chief Finance Officer"
            class="shrink mr-2"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="130"
            height="80"
          />
        </router-link>
        <div class="text-md-h4">Automated Chief Financial Officer</div>
      </div>

      <v-spacer></v-spacer>

      <router-link to="/quotations">
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
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
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
