import BillingDocument, { BillingDocumentData } from "./BillingDocument";

interface QuotationData extends BillingDocumentData {
  quotationNumber?: string;
  quotationDate?: string;
}

export default class Quotation extends BillingDocument {
  public quotationNumber = "";
  public quotationDate = "";

  constructor(data?: QuotationData) {
    super(data);
    if (!data) return;
    this.parse(data);
  }

  public parse(data: Partial<QuotationData>) {
    super.parse(data);
    this.quotationNumber = data.quotationNumber || "";
    this.quotationDate = data.quotationDate || "";
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

  get hasQuotationNumber(): boolean {
    return true;
  }

  get hasInvoiceNumber(): boolean {
    return false;
  }

  get hasReceiptNumber(): boolean {
    return false;
  }
}
