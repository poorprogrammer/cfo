import keycloak from "@/services/KeycloakService";
import { View } from "./BillingArchivePresenter";

export default class LoginPresenter {
  view: View;

  constructor(view: View) {
    this.view = view;
  }

  login() {
    keycloak.login({
      redirectUri: window.location.origin + "/home",
    });
  }

  showError(error: string) {
    alert(error);
  }
}
