export interface Browser {
  containsText(text);
  shouldNotContains(text: string);
  getButtonByName(string): Element;
  getByLabel(label: string): Element;
  getFieldByRowAndLabel(rowName: string, label: string): Element;
  goto(url);
  locator(string): Element;
}

export interface Element {
  click(): void;
  fill(item: string): void;
  type(text: string): void;
}
