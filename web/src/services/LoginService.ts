import axios from "axios";

export default class LoginService {
  protected root: string;

  constructor() {
    this.root = process.env.VUE_APP_BASE_API || "";
  }

  login(username: string, password: string): Promise<string> {
    return axios.post(`${this.root}/login/`, {
      username: username,
      password: password,
    });
  }
}
