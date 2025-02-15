import BillingDocument from "./BillingDocument";

export default class Invoice extends BillingDocument {
  declare id?: string;
  invoiceNumber = "";
  invoiceDate = "";
  quotationNumber = "";
  purchaseOrderNumber = "";

  constructor(data?: Partial<Invoice>) {
    super(data);
    Object.assign(this, data);
  }

  get hasInvoiceNumber() {
    return true;
  }

  get hasReceiptNumber() {
    return false;
  }

  get number(): string {
    return this.invoiceNumber;
  }

  set number(value: string) {
    this.invoiceNumber = value;
  }

  get documentType(): string {
    return "Invoice";
  }

  get date(): string {
    return this.invoiceDate;
  }

  set date(value: string) {
    this.invoiceDate = value;
  }
}
