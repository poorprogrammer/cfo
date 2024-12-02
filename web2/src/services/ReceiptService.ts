import InvoiceService from "@/services/InvoiceService";
import type { PaymentInfoItem } from "./types";
import PaymentInformation from "@/models/PaymentInformation";

export class ReceiptService extends InvoiceService {
  protected collectionUrl(): string {
    return `${this.root}/receipts/`;
  }

  protected itemUrl(receiptNumber: string): string {
    return `${this.root}/receipt/${receiptNumber}`;
  }

  protected createItem(item: any): PaymentInformation {
    return {
      ...item,
      documentType: "Receipt",
    };
  }
}
