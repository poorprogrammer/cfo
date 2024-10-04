import axios from "axios";

export default class LoginService {
  constructor() {
    this.root = import.meta.env.VITE_APP_BASE_API;
  }

  login(username, password) {
    return axios.post(`${this.root}/login/`, {
      username: username,
      password: password,
    });
  }
}
