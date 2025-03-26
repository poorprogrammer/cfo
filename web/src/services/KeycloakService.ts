const keycloakConfig = {
  url: process.env.VUE_APP_KEYCLOAK_URL || "http://localhost:8080",
  realm: process.env.VUE_APP_KEYCLOAK_REALM || "your-realm",
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID || "your-client-id",
};

let keycloak: any = null;

// Initialize in the router guard
export const initKeycloak = async () => {
  if (!keycloak) {
    const Keycloak = (await import("keycloak-js")).default;
    keycloak = new Keycloak(keycloakConfig);
    await keycloak.init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      checkLoginIframe: false,
    });
  }
  return keycloak;
};

export const hasRequiredGroup = (kc: any): boolean => {
  const groups = kc.tokenParsed?.groups || [];
  return groups.some(
    (group: string) => group === "/cfo" || group.endsWith("/cfo")
  );
};

export const login = async () => {
  const kc = await initKeycloak();
  return kc.login({
    redirectUri: window.location.origin + "/invoices",
  });
};

export const logout = async () => {
  const kc = await initKeycloak();
  await kc.logout({
    redirectUri: window.location.origin,
  });
};

export default { initKeycloak, login, logout, hasRequiredGroup };
