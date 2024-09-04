import Quotation from "@/models/Quotation";
import InvoiceService from "@/services/InvoiceService";

export default class QuotationService extends InvoiceService {
  constructor() {
    super();
    this.root = process.env.VUE_APP_BASE_API;
  }

  collectionUrl() {
    return `${this.root}/quotations/`;
  }

  itemUrl(quotationNumber) {
    return `${this.root}/quotation/${quotationNumber}`;
  }

  createItem = (item) => {
    return new Quotation(item);
  };
}
