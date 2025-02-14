import LineItem, { ILineItem } from "./LineItem";
import PricedLineItem from "./PricedLineItem";

interface Company {
  name: string;
  address?: string;
  taxId?: string;
  tel?: string;
}

export interface IBillingDocument {
  companySlug?: string;
  fromCompany?: Company;
  targetCompany?: Company;
  projectName?: string;
  remark?: string;
  currency?: string;
  items?: ILineItem[];
  deleted?: boolean;
  payment?: string;
}

export interface BillingDocumentData extends IBillingDocument {
  _id?: string;
}

export interface BillingDocumentWithId extends IBillingDocument {
  id?: string;
}
export default abstract class BillingDocument implements BillingDocumentWithId {
  protected _currencies: Record<string, Intl.NumberFormat>;
  protected _currency?: string;
  public id?: string;
  public companySlug?: string;
  public remark = "";
  public projectName = "";
  public dialog: boolean;
  public deleted: boolean;
  public items: LineItem[];
  public fromCompany: Company = {
    name: "",
    address: "",
    taxId: "",
    tel: "",
  };
  public targetCompany: Company = {
    name: "",
    address: "",
    taxId: "",
    tel: "",
  };
  public payment = "";

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
    this.payment = data.payment || "";
    if (!data.items) return;
    this.items = data.items.map(
      (i) => new PricedLineItem(this, i.name, i.price || 0, i.amount || 0)
    );
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

  getItems(): (LineItem | PricedLineItem)[] {
    const total = this.getTotal();
    return [
      ...this.items.map((item) => {
        const newItem = new PricedLineItem(
          this,
          item.name,
          item.price,
          item.amount
        );
        newItem._price = Number(item.price);
        return newItem;
      }),
      new PricedLineItem(this, "Total", total, 1),
      new PricedLineItem(this, "VAT 7%", total * 0.07, 1),
      new PricedLineItem(this, "Grand Total", total * 1.07, 1),
    ];
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
    return this.items.reduce((sum, item) => {
      let total = 0;
      if (typeof item === "object") {
        total = new PricedLineItem(
          this,
          item.name,
          item.price,
          item.amount
        ).total();
      }
      return sum + total;
    }, 0);
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
    return this.payment ? "dense" : "";
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

  createPricedLineItem(
    name = "",
    price: number | string = "",
    amount: number | string = ""
  ): PricedLineItem {
    return new PricedLineItem(this, name, price, amount);
  }

  filename(): string {
    return `${this.number}_${this.documentType.toUpperCase()}_${
      this.targetCompany.name
    }_${this.projectName}`;
  }

  get listUrl(): { name: string } {
    return { name: `${this.documentType.toLowerCase()}s` };
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

  // These properties should be implemented by child classes
  public abstract get documentType(): string;
  abstract get number(): string;
  abstract set number(value: string);
  abstract get date(): string;
  abstract set date(value: string);
}

function sum(x: number, y: number): number {
  return x + y;
}
