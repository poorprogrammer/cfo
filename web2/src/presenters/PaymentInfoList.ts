import PaymentInformation from "@/models/PaymentInformation";
import { PaymentInfoService } from "@/services/types";

interface Header {
  text: string;
  value: string;
  sortable?: boolean;
}

export default class PaymentInfoList {
  protected view: any;
  protected items: PaymentInformation[];
  protected headers: Header[];
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

  setAll = (items: PaymentInformation[]): void => {
    this.items = items;
  };

  delete = (item: PaymentInformation): void => {
    this.API.delete(item).then(this.removeItemFromList);
    this.closeDeleteConfirmDialogOf(item);
  };

  removeItemFromList = (item: PaymentInformation): void => {
    this.items = this.items.filter((i) => i.number !== item.number);
  };

  cancelDelete = (item: PaymentInformation): void => {
    this.closeDeleteConfirmDialogOf(item);
  };

  closeDeleteConfirmDialogOf = (item: PaymentInformation): void => {
    item.dialog = false;
  };
}
