import type { PaymentInfoService } from "@/services/types";
import PaymentInfoList, { View } from "./PaymentInfoList";
import BillingDocument from "@/models/BillingDocument";

export class InvoiceListPresenter extends PaymentInfoList {
  private isGeneratingReceipt = false;
  private selectedInvoices: BillingDocument[] = [];

  constructor(view: View, api: PaymentInfoService) {
    super(view, api);
  }

  toggleGenerateReceipt(): void {
    this.isGeneratingReceipt = !this.isGeneratingReceipt;
    if (!this.isGeneratingReceipt) {
      this.generateReceipt();
    }
  }

  private generateReceipt(): void {
    this.view.goTo({
      name: "createReceipt",
      params: {
        invoices: this.selectedInvoices,
      },
    });
  }

  get buttonColor(): string {
    return this.isGeneratingReceipt ? "purple" : "primary";
  }
}
