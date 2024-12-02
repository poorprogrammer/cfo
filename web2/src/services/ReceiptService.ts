import { InvoiceService } from "./InvoiceService";
import type { PaymentInfoItem } from "./types";

export class ReceiptService extends InvoiceService {
  protected collectionUrl(): string {
    return `${this.root}/receipts/`;
  }

  protected itemUrl(receiptNumber: string): string {
    return `${this.root}/receipt/${receiptNumber}`;
  }

  protected createItem(item: any): PaymentInfoItem {
    return {
      ...item,
      documentType: "Receipt",
    };
  }
}
