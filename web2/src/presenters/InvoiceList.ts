import BillingDocument, { IBillingDocument } from "@/models/BillingDocument";
import InvoiceService from "@/services/InvoiceService";
import BillingArchive, { Presenter, View } from "./BillingArchive";
import Invoice from "@/models/Invoice";

export interface IInvoiceListPresenter extends Presenter {
  selectedInvoices: IBillingDocument[];
  isGeneratingReceipt: boolean;
  toggleGenerateReceipt(): void;
  buttonColor: string;
}

export class InvoiceListPresenter
  extends BillingArchive
  implements IInvoiceListPresenter
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
