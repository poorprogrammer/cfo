import BillingDocument from "./BillingDocument";

export default class Invoice extends BillingDocument {
  declare id?: string;
  invoiceNumber = "";
  invoiceDate = "";
  quotationNumber = "";
  purchaseOrderNumber = "";

  constructor(data: Partial<Invoice>) {
    super(data);
    Object.assign(this, data);
  }

  get hasInvoiceNumber() {
    return true;
  }

  get number(): string {
    return this.invoiceNumber;
  }

  get documentType(): string {
    return "Invoice";
  }

  get date(): string {
    return this.invoiceDate;
  }
}
