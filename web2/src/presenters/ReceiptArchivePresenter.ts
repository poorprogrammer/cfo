import { ReceiptService } from "@/services/ReceiptService";
import { View } from "./BillingArchivePresenter";

import BillingArchivePresenter from "./BillingArchivePresenter";
import BillingDocument from "@/models/BillingDocument";

export default class ReceiptArchivePresenter extends BillingArchivePresenter {
  constructor(view: View, api: ReceiptService) {
    super(view, api);
  }

  setAll(items: BillingDocument[]): void {
    this.items.value = items;
  }
}
