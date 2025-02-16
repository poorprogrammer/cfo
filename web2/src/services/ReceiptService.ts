import InvoiceService from "@/services/InvoiceService";
import BillingDocument, { BillingDocumentData } from "@/models/BillingDocument";
import Receipt from "@/models/Receipt";

export class ReceiptService extends InvoiceService {
  protected collectionUrl(): string {
    return `${this.root}/receipts/`;
  }

  protected itemUrl(receiptNumber: string): string {
    return `${this.root}/receipt/${receiptNumber}`;
  }

  protected createItem(item: BillingDocumentData): BillingDocument {
    return new Receipt(item);
  }
}
