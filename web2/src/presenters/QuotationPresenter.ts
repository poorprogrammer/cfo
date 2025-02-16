import BillingDocumentPresenter from "./BillingDocumentPresenter";
import Quotation from "@/models/Quotation";
import { View } from "./BillingArchivePresenter";
import BillingDocumentService from "@/services/BillingDocumentService";

export default class QuotationPresenter extends BillingDocumentPresenter<Quotation> {
  constructor(view: View, api: BillingDocumentService) {
    super(view, api, Quotation);
  }
}
