import BillingDocument, {
  BillingDocumentWithId,
} from "@/models/BillingDocument";
import InvoiceService from "@/services/InvoiceService";
import PaymentInfoList, { Presenter, View } from "./PaymentInfoList";

export interface IInvoiceListPresenter extends Presenter {
  selectedInvoices: BillingDocumentWithId[];
  isGeneratingReceipt: boolean;
  toggleGenerateReceipt(): void;
  buttonColor: string;
}

export class InvoiceListPresenter
  extends PaymentInfoList
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
}
