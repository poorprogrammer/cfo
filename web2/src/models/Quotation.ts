import BillingDocument, { BillingDocumentData } from "./BillingDocument";

interface QuotationData extends BillingDocumentData {
  quotationNumber?: string;
  quotationDate?: string;
}

export default class Quotation extends BillingDocument {
  protected quotationNumber?: string;
  protected quotationDate?: string;

  constructor(data?: QuotationData) {
    super(data);
    if (!data) return;

    this.quotationNumber = data.quotationNumber;
    this.quotationDate = data.quotationDate;
  }

  get number(): string {
    return this.quotationNumber || "";
  }

  set number(n: string) {
    this.quotationNumber = n;
  }

  get date(): string {
    return this.quotationDate || "";
  }

  set date(d: string) {
    this.quotationDate = d;
  }

  get documentType(): string {
    return "Quotation";
  }

  get hasInvoiceNumber(): boolean {
    return false;
  }

  get hasReceiptNumber(): boolean {
    return false;
  }
}
