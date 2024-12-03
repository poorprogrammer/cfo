import BillingDocument from "./BillingDocument";

interface Company {
  name: string;
  address: string;
  taxId: string;
  tel: string;
}

export default class Invoice extends BillingDocument {
  declare id?: string;
  invoiceNumber = "";
  invoiceDate = "";
  quotationNumber = "";
  purchaseOrderNumber = "";
  remark = "";
  projectName = "";
  fromCompany: Company = {
    name: "",
    address: "",
    taxId: "",
    tel: "",
  };
  targetCompany: Company = {
    name: "",
    address: "",
    taxId: "",
    tel: "",
  };

  constructor(data: Partial<Invoice>) {
    super(data);
    Object.assign(this, data);
  }

  get hasInvoiceNumber() {
    return true;
  }

  itemClass(): string {
    return this.items.length > 3 ? "small" : "";
  }

  markAsDeleted(): void {
    this.deleted = true;
    this.invoiceNumber = `${
      this.invoiceNumber
    }-cancelled-${this.currentTimestamp()}`;
  }

  get number(): string {
    return this.invoiceNumber;
  }

  protected get documentType(): string {
    return "Invoice";
  }
}
