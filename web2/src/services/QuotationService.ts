import BillingDocument from "@/models/PaymentInformation";
import Quotation from "@/models/Quotation";
import InvoiceService from "@/services/InvoiceService";

export default class QuotationService extends InvoiceService {
  constructor() {
    super();
    this.root = process.env.VUE_APP_BASE_API;
  }

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
