const keycloakConfig = {
  url: process.env.VUE_APP_KEYCLOAK_URL || "http://localhost:8080",
  realm: process.env.VUE_APP_KEYCLOAK_REALM || "your-realm",
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID || "your-client-id",
};

let keycloak: any = null;

// Initialize in the router guard
let initialized = false;
export const initKeycloak = async () => {
  if (!initialized) {
    const Keycloak = (await import("keycloak-js")).default;
    if (!keycloak) {
      keycloak = new Keycloak(keycloakConfig);
    }
    initialized = true;
    await keycloak.init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
    });
  }
  return keycloak;
};

export default keycloak;
