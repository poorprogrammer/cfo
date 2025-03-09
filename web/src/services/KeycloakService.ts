const keycloakConfig = {
  url: process.env.VUE_APP_KEYCLOAK_URL || "http://localhost:8080",
  realm: process.env.VUE_APP_KEYCLOAK_REALM || "your-realm",
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID || "your-client-id",
};

// Using dynamic import
const keycloak = await (async () => {
  const Keycloak = (await import("keycloak-js")).default;
  return new Keycloak(keycloakConfig);
})();

export default keycloak;
