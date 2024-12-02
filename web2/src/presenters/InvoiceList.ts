import { PaymentInfoList } from "./PaymentInfoList";
import type { Router } from "vue-router";
import type { PaymentInfoService } from "@/services/types";

interface View {
  goTo: (path: string | { name: string; params: any }) => void;
}

export class InvoiceListPresenter extends PaymentInfoList {
  private isGeneratingReceipt = false;
  private selectedInvoices: any[] = [];

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
