export interface Browser {
  goto(url);
  getByLabel(string);
  getButtonByName(string);
  getRoleByName(role: Role, name: string);
  containsText(string);
  locator(string);
}

export type Role = "button" | "row";
