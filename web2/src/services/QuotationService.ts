import BillingDocument from "@/models/BillingDocument";
import Quotation from "@/models/Quotation";
import InvoiceService from "@/services/InvoiceService";

export default class QuotationService extends InvoiceService {
  protected collectionUrl(): string {
    return `${this.root}/quotations/`;
  }

  protected itemUrl(quotationNumber: string): string {
    return `${this.root}/quotation/${quotationNumber}`;
  }

  protected createItem(item: any): BillingDocument {
    return new Quotation(item);
  }
}
