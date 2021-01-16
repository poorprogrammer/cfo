<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-card outlined class="pa-2">
        <div>
          <v-text-field id="username" label="Username" v-model="p.username" />
          <v-text-field id="password" label="Password" type="password" v-model="p.password" />

          <v-btn
            id="login-button"
            class="mx-1"
            dark
            color="primary"
            @click="login"
          >
            Login
            <v-icon dark>mdi-login</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Presenter from "@/presenters/Login";

export default {
  name: "login",
  mounted() {},
  data() {
    return {
      p: new Presenter(this),
    };
  },
  methods: {
    login: function() { this.p.login() },
    goTo: function(path) { this.$router.push(path) }
  }
};
</script>
