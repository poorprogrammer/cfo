import BillingDocument from "@/models/BillingDocument";
import { PaymentInfoService } from "@/services/types";

interface Header {
  text: string;
  value: string;
  sortable?: boolean;
}

export default class PaymentInfoList {
  protected view: any;
  public items: BillingDocument[];
  public headers: Header[];
  protected API: PaymentInfoService;

  constructor(view: any, api: PaymentInfoService) {
    this.view = view;
    this.items = [];
    this.headers = [
      { text: "Number", value: "number" },
      { text: "Company", value: "targetCompany.name" },
      { text: "Project", value: "projectName" },
      { text: "Date", value: "date" },
      { text: "Actions", value: "action", sortable: false },
    ];
    this.API = api;
  }

  init(year: number): void {
    this.API.getAll(year.toString()).then(this.setAll);
  }

  setAll = (items: BillingDocument[]): void => {
    this.items = items;
  };

  delete = (item: BillingDocument): void => {
    this.API.delete(item).then(this.removeItemFromList);
    this.closeDeleteConfirmDialogOf(item);
  };

  removeItemFromList = (item: BillingDocument): void => {
    this.items = this.items.filter((i) => i.number !== item.number);
  };

  cancelDelete = (item: BillingDocument): void => {
    this.closeDeleteConfirmDialogOf(item);
  };

  closeDeleteConfirmDialogOf = (item: BillingDocument): void => {
    item.dialog = false;
  };
}
