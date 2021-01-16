import API from "@/services/login";
export default class {
  constructor(view) {
    this.view = view;
    this.API = new API();
  }
  login() {
    this.API.login(this.username, this.password)
      .then(() => {
        this.view.goTo({name: 'home'})
      }, (error) => {
        this.showError(error);
      });
  }
  showError(error) {
    alert(error)
  }
}
