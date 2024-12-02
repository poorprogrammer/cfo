import InvoiceItem from "./InvoiceItem";
import PricedInvoiceItem from "./PricedInvoiceItem";

interface Company {
  name: string;
  address?: string;
  taxId?: string;
  tel?: string;
}

export interface PaymentInformationData {
  _id?: string;
  companySlug?: string;
  fromCompany?: Company;
  targetCompany?: Company;
  projectName?: string;
  remark?: string;
  currency?: string;
  items?: any[];
  deleted?: boolean;
}

export default class PaymentInformation {
  protected _currencies: Record<string, Intl.NumberFormat>;
  protected _currency?: string;
  protected id?: string;
  protected companySlug?: string;
  protected fromCompany: Company;
  protected targetCompany: Company;
  protected projectName?: string;
  protected remark?: string;
  protected dialog: boolean;
  protected deleted: boolean;
  protected items: InvoiceItem[];

  constructor(data?: PaymentInformationData) {
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
    this.projectName = data.projectName;
    this.remark = data.remark;
    this._currency = data.currency;
    this.deleted = data.deleted || false;

    if (!data.items) return;
    data.items.forEach((i) => {
      this.items.push(Object.assign(this.createPricedInvoiceItem(), i));
    });
  }

  url(): string {
    return `/${this.documentType.toLowerCase()}/${this.number}`;
  }

  duplicationUrl(): string {
    return `${this.url()}/duplicate`;
  }

  editionUrl(): string {
    return `${this.url()}/edit`;
  }

  getItems(): InvoiceItem[] {
    return [...this.items, this.total(), this.tax(), this.grandTotal()];
  }

  total(): InvoiceItem {
    return new InvoiceItem("Total", this.getTotal(), this);
  }

  tax(): InvoiceItem {
    return new InvoiceItem("VAT 7%", this.getTotal() * 0.07, this);
  }

  grandTotal(): InvoiceItem {
    return new InvoiceItem("Grand Total", this.getTotal() * 1.07, this);
  }

  getTotal(): number {
    return this.items.map(getItemTotal).reduce(sum, 0);
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

  addItemBefore(item: PricedInvoiceItem): void {
    let i = this.items.indexOf(item);
    if (i < 0) i = this.items.length;
    this.items.splice(i, 0, this.createPricedInvoiceItem());
  }

  removeItem(item: PricedInvoiceItem): void {
    let i = this.items.indexOf(item);
    if (i < 0) return;
    this.items.splice(i, 1);
  }

  setDateToday(today: Date = new Date()): void {
    this.date = this.formatDate(today);
  }

  formatDate(date: Date): string {
    let y = this.year(date);
    let m = this.month(date);
    let d = date.getDate().toString().padStart(2, "0");
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

  createPricedInvoiceItem(): PricedInvoiceItem {
    return new PricedInvoiceItem(this);
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

function getItemTotal(item: PricedInvoiceItem): number {
  return item.total();
}

function sum(x: number, y: number): number {
  return x + y;
}