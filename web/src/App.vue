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
        <div class="text-md-h4">Automated Chief Financial Officers</div>
      </div>

      <v-spacer></v-spacer>

      <router-link to="/quotations">
        <button id="quotation-list-btn" class="nav-button">
          <span class="icon">❝</span>
          <span class="list-btn-label">quotation</span>
        </button>
      </router-link>

      <router-link to="/invoices">
        <button id="invoice-list-btn" class="nav-button">
          <span class="icon">📄</span>
          <span class="list-btn-label">invoice</span>
        </button>
      </router-link>

      <router-link to="/receipts">
        <button id="receipt-list-btn" class="nav-button">
          <span class="icon">💰</span>
          <span class="list-btn-label">receipt</span>
        </button>
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

.nav-button {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid white;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1em;
  transition: opacity 0.2s;
}

.nav-button:hover {
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.1);
}

.nav-button .icon {
  font-size: 1.2em;
}

@media (max-width: 600px) {
  .list-btn-label {
    display: none;
  }

  .nav-button {
    padding: 8px;
  }

  .nav-button .icon {
    margin: 0;
  }
}

/* Global print styles */
@media print {
  .v-app-bar {
    display: none !important;
  }

  .v-main {
    padding-top: 0 !important;
  }

  .v-application {
    padding-top: 0 !important;
  }
}
</style>
