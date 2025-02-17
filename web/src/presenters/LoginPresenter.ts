import API from "@/services/LoginService";
import { View } from "./BillingArchivePresenter";

export default class LoginPresenter {
  view: View;
  API: API;
  username: string;
  password: string;
  constructor(view: View) {
    this.view = view;
    this.API = new API();
    this.username = "";
    this.password = "";
  }
  login() {
    this.API.login(this.username, this.password).then(
      (token: string) => {
        localStorage.setItem("token", token);
        this.view.goTo({ name: "home", params: {} });
      },
      (error: string) => {
        this.showError(error);
      }
    );
  }
  showError(error: string) {
    alert(error);
  }
}
