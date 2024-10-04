<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-card outlined class="pa-2">
        <div>
          <input type="text" />
          <input id="username" label="Username" v-model="p.username" />
          <base-input id="password" label="Password" v-model="p.password" type="password" />
          <v-btn id="login-button" class="mx-1" dark color="primary" @click="login">
            Login
            <v-icon dark>mdi-login</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import LoginPresenter from "@/presenters/Login";
import BaseInput from "@/components/BaseInput.vue";
const p = new LoginPresenter(this);
function login() {
  p.login(this.API.login(this.username, this.password));
}
// export default {
//   name: "LoginView",
//   components: { BaseInput },
//   data() {
//     return {
//       p: new Presenter(this),
//     };
//   },
//   methods: {
//     login: function () {
//       this.p.login();
//     },
//     goTo: function (path) {
//       this.$router.push(path);
//     },
//   },
// };
</script>
