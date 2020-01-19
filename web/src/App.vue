<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            id="app_logo"
            alt="Automated Chief Finance Officer"
            class="shrink mr-2"
            contain
            src="./assets/odds_logo.png"
            transition="scale-transition"
            width="130"
          />
        </router-link>
        <h1>Automated Chief Financial Officer</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
