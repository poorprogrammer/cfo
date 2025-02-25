<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-form">
        <base-input id="username" label="Username" v-model="p.username" />
        <base-input
          id="password"
          label="Password"
          v-model="p.password"
          type="password"
        />
        <button id="login-button" class="login-button" @click="login">
          <span class="button-text">Login</span>
          <span class="icon">➜</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Presenter from "../presenters/LoginPresenter";
import BaseInput from "../components/BaseInput.vue";

export default {
  name: "LoginView",
  components: { BaseInput },
  data() {
    return {
      p: new Presenter(this),
    };
  },
  methods: {
    login: function () {
      this.p.login();
    },
    goTo: function (path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 500px; /* Equivalent to cols="6" in most cases */
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-form {
  padding: 16px;
}

.login-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin: 4px;
  background-color: var(--primary-color, #1976d2);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: var(--primary-hover-color, #1565c0);
}

.login-button .icon {
  font-size: 1.2em;
}

.button-text {
  font-weight: 500;
}
</style>
