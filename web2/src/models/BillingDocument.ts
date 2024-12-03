import LineItem from "./LineItem";
import PricedLineItem from "./PricedLineItem";

interface Company {
  name: string;
  address?: string;
  taxId?: string;
  tel?: string;
}

export interface BillingDocumentData {
  _id?: string;
  companySlug?: string;
  fromCompany?: Company;
  targetCompany?: Company;
  projectName?: string;
  remark?: string;
  currency?: string;
  items?: LineItem[];
  deleted?: boolean;
}

export default class BillingDocument {
  protected _currencies: Record<string, Intl.NumberFormat>;
  protected _currency?: string;
  public id?: string;
  protected companySlug?: string;
  protected remark = "";
  protected projectName = "";
  public dialog: boolean;
  protected deleted: boolean;
  protected items: LineItem[];
  protected fromCompany: Company = {
    name: "",
    address: "",
    taxId: "",
    tel: "",
  };
  protected targetCompany: Company = {
    name: "",
    address: "",
    taxId: "",
    tel: "",
  };

  constructor(data?: BillingDocumentData) {
    this._currencies = {
      THB: new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
        currencyDisplay: "code",
      }),
      USD: new Intl.NumberFormat("us-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "code",
      }),
    };
    this.fromCompany = { name: "" };
    this.targetCompany = { name: "" };
    this.items = [];
    this.dialog = false;
    this.deleted = false;

    if (!data) return;

    this.id = data._id;
    this.companySlug = data.companySlug;
    this.fromCompany = { ...data.fromCompany } as Company;
    this.targetCompany = { ...data.targetCompany } as Company;
    this.projectName = data.projectName || this.projectName;
    this.remark = data.remark || this.remark;
    this._currency = data.currency;
    this.deleted = data.deleted || false;

    if (!data.items) return;
    data.items.forEach((i) => {
      this.items.push(Object.assign(this.createPricedLineItem(), i));
    });
  }

  public url(): string {
    return `/${this.documentType.toLowerCase()}/${this.number}`;
  }

  duplicationUrl(): string {
    return `${this.url()}/duplicate`;
  }

  editionUrl(): string {
    return `${this.url()}/edit`;
  }

  getItems(): LineItem[] {
    return [...this.items, this.total(), this.tax(), this.grandTotal()];
  }

  total(): LineItem {
    return new LineItem("Total", this.getTotal(), this);
  }

  tax(): LineItem {
    return new LineItem("VAT 7%", this.getTotal() * 0.07, this);
  }

  grandTotal(): LineItem {
    return new LineItem("Grand Total", this.getTotal() * 1.07, this);
  }

  getTotal(): number {
    return this.items.map((i: LineItem) => i.total()).reduce(sum, 0);
  }

  getFromCompanyName(): string {
    return this.fromCompany.name;
  }

  getFromCompanyAddress(): string | undefined {
    return this.fromCompany.address;
  }

  getFromCompanyTaxId(): string | undefined {
    return this.fromCompany.taxId;
  }

  getFromCompanyTel(): string | undefined {
    return this.fromCompany.tel;
  }

  getTargetCompanyName(): string {
    return this.targetCompany.name;
  }

  targetCompanyNameClass(): string {
    return this.getTargetCompanyName().length > 40 ? "small" : "";
  }

  itemClass(): string {
    return this.items.length > 3 ? "small" : "";
  }

  tablePaddingClass(): string {
    return "";
  }

  getTargetCompanyAddress(): string | undefined {
    return this.targetCompany.address;
  }

  getTargetCompanyTaxId(): string | undefined {
    return this.targetCompany.taxId;
  }

  getTargetCompanyTel(): string | undefined {
    return this.targetCompany.tel;
  }

  getProjectName(): string | undefined {
    return this.projectName;
  }

  getTitles(): Array<{ id: number; title: string; css: string }> {
    return [
      { id: 1, title: `${this.documentType} (original)`, css: "" },
      { id: 2, title: `${this.documentType} (copy)`, css: "print-only" },
    ];
  }

  getCurrencies(): string[] {
    return Object.keys(this._currencies);
  }

  markAsDeleted(): void {
    this.deleted = true;
    this.number = `${this.number}-cancelled-${this.currentTimestamp()}`;
  }

  currentTimestamp(): number {
    return new Date().getTime();
  }

  addItemBefore(item: LineItem): void {
    let i = this.items.indexOf(item);
    if (i < 0) i = this.items.length;
    this.items.splice(i, 0, this.createPricedLineItem() as unknown as LineItem);
  }

  removeItem(item: LineItem): void {
    const i = this.items.indexOf(item);
    if (i < 0) return;
    this.items.splice(i, 1);
  }

  setDateToday(today: Date = new Date()): void {
    this.date = this.formatDate(today);
  }

  formatDate(date: Date): string {
    const y = this.year(date);
    const m = this.month(date);
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  newInvoiceNumber(date: Date): string {
    return `${this.year(date)}${this.month(date)}-`;
  }

  year(date: Date): number {
    return date.getFullYear();
  }

  month(date: Date): string {
    return (1 + date.getMonth()).toString().padStart(2, "0");
  }

  createPricedLineItem(): PricedLineItem {
    return new PricedLineItem(this);
  }

  filename(): string {
    return `${this.number}_${this.documentType.toUpperCase()}_${
      this.targetCompany.name
    }_${this.projectName}`;
  }

  get listUrl(): { name: string } {
    return { name: `${this.documentType.toLowerCase()}s` };
  }

  // These properties should be implemented by child classes
  protected get documentType(): string {
    throw new Error("documentType must be implemented by child class");
  }

  get number(): string {
    throw new Error("number must be implemented by child class");
  }

  set number(value: string) {
    throw new Error("number setter must be implemented by child class");
  }

  get date(): string {
    throw new Error("date must be implemented by child class");
  }

  set date(value: string) {
    throw new Error("date setter must be implemented by child class");
  }

  get currencies(): Record<string, Intl.NumberFormat> {
    return this._currencies;
  }

  get currency(): string {
    return this._currency || "THB";
  }

  set currency(value: string) {
    this._currency = value;
  }
}

function sum(x: number, y: number): number {
  return x + y;
}
