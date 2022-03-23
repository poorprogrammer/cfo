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
        <v-icon dark>mdi-format-quote-open</v-icon>
      </router-link>
      <router-link to="/invoices">
        <v-icon dark>mdi-file-document-outline</v-icon>
      </router-link>
      <router-link to="/receipts">
        <v-icon dark>mdi-currency-usd</v-icon>
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
