import BillingDocument, { BillingDocumentData } from "@/models/BillingDocument";
import InvoiceService from "@/services/InvoiceService";
import BillingArchivePresenter, {
  Presenter,
  View,
} from "./BillingArchivePresenter";
import Invoice from "@/models/Invoice";

export interface IInvoiceArchivePresenter extends Presenter {
  selectedInvoices: BillingDocumentData[];
  isGeneratingReceipt: boolean;
  toggleGenerateReceipt(): void;
  buttonColor: string;
}

export class InvoiceArchivePresenter
  extends BillingArchivePresenter
  implements IInvoiceArchivePresenter
{
  public isGeneratingReceipt = false;
  public selectedInvoices: BillingDocument[] = [];

  constructor(view: View, api: InvoiceService) {
    super(view, api);
  }

  toggleGenerateReceipt(): void {
    this.isGeneratingReceipt = !this.isGeneratingReceipt;
    if (!this.isGeneratingReceipt) {
      this.generateReceipt();
    }
  }

  generateReceipt(): void {
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

  public setAll(items: BillingDocument[]): void {
    const newItems = items.map((item) => {
      if (!(item instanceof BillingDocument)) {
        return new Invoice(item);
      }
      return item;
    });
    this.items.value = newItems;
  }
}
