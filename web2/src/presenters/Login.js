import API from "@/services/login";
export default class {
  constructor(view) {
    this.view = view;
    this.API = new API();
  }
  login() {
    this.API.login(this.username, this.password).then(
      (token) => {
        localStorage.setItem("token", token);
        this.view.goTo({ name: "home" });
      },
      (error) => {
        this.showError(error);
      }
    );
  }
  showError(error) {
    alert(error);
  }
}
