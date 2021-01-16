import axios from "axios";

export default class {
  constructor() {
    this.root = process.env.VUE_APP_BASE_API
  }

  login(username, password) {
    return axios.post(`${this.root}/login/`, {username: username, password: password})
  }
}