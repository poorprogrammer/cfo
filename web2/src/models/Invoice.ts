import PaymentInformation from "./PaymentInformation";

interface InvoiceData {
  invoiceNumber?: string;
  invoiceDate?: string;
  quotationNumber?: string;
  purchaseOrderNumber?: string;
  payment?: any;
}

export default class Invoice extends PaymentInformation {
  protected invoiceNumber?: string;
  protected invoiceDate?: string;
  protected quotationNumber?: string;
  protected purchaseOrderNumber?: string;
  protected payment?: any;

  constructor(data?: InvoiceData & PaymentInformationData) {
    super(data);
    if (!data) return;

    this.invoiceNumber = data.invoiceNumber;
    this.invoiceDate = data.invoiceDate;
    this.quotationNumber = data.quotationNumber;
    this.purchaseOrderNumber = data.purchaseOrderNumber;
    this.payment = data.payment;
  }

  get number(): string {
    return this.invoiceNumber || "";
  }

  set number(n: string) {
    this.invoiceNumber = n;
  }

  get date(): string {
    return this.invoiceDate || "";
  }

  set date(d: string) {
    this.invoiceDate = d;
  }

  get documentType(): string {
    return "Invoice";
  }

  get hasInvoiceNumber(): boolean {
    return true;
  }

  get hasReceiptNumber(): boolean {
    return false;
  }

  tablePaddingClass(): string {
    return this.payment ? "dense" : "";
  }
}
