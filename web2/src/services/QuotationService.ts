import { InvoiceService } from "./InvoiceService";
import type { PaymentInfoItem } from "./types";

export class QuotationService extends InvoiceService {
  protected collectionUrl(): string {
    return `${this.root}/quotations/`;
  }

  protected itemUrl(quotationNumber: string): string {
    return `${this.root}/quotation/${quotationNumber}`;
  }

  protected createItem(item: any): PaymentInfoItem {
    return {
      ...item,
      documentType: "Quotation",
    };
  }
}
