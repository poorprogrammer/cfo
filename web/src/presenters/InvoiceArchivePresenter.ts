import BillingDocument from "@/models/BillingDocument";
import Invoice from "@/models/Invoice";
import Receipt from "@/models/Receipt";
import InvoiceService from "@/services/InvoiceService";
import BillingArchivePresenter, {
  Presenter,
  View,
} from "./BillingArchivePresenter";

export interface IInvoiceArchivePresenter extends Presenter {
  selectedInvoices: BillingDocument[];
  isGeneratingReceipt: boolean;
  toggleGenerateReceipt(): void;
  buttonColor: string;
}

export class InvoiceArchivePresenter
  extends BillingArchivePresenter
  implements IInvoiceArchivePresenter
{
  public isGeneratingReceipt = false;
  public selectedInvoices: Invoice[] = [];

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
      path: "/receipt/create",
      query: {
        receipt: JSON.stringify(
          Receipt.createFromInvoices(this.selectedInvoices)
        ),
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
