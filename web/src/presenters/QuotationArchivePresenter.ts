import QuotationService from "@/services/QuotationService";
import { View } from "./BillingArchivePresenter";

import BillingArchivePresenter from "./BillingArchivePresenter";
import BillingDocument from "@/models/BillingDocument";

export default class QuotationArchivePresenter extends BillingArchivePresenter {
  constructor(view: View, api: QuotationService) {
    super(view, api);
  }

  setAll(items: BillingDocument[]): void {
    this.items.value = items;
  }
}
