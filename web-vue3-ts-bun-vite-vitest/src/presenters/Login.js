import API from "@/services/LoginService";
export default class {
  constructor(view) {
    this.view = view;
    this.API = new API();
  }
  login() {
    this.API.login(this.username, this.password).then(
      this.handleLoginSuccess,
      (error) => {
        this.showError(error);
      }
    );
  }

  handleLoginSuccess(token) {
    localStorage.setItem("token", token);
    this.view.goTo({ name: "home" });
  }
  showError(error) {
    alert(error);
  }
}
