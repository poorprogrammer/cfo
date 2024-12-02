import type { PaymentInfoService } from "@/services/types";

interface View {
  goTo: (path: string | { name: string; params: any }) => void;
}

interface TableHeader {
  text: string;
  value: string;
  sortable?: boolean;
}

export class PaymentInfoList {
  protected view: View;
  protected items: any[] = [];
  protected headers: TableHeader[] = [
    { text: "Number", value: "number" },
    { text: "Company", value: "targetCompany.name" },
    { text: "Project", value: "projectName" },
    { text: "Date", value: "date" },
    { text: "Actions", value: "action", sortable: false },
  ];
  protected API: PaymentInfoService;

  constructor(view: View, api: PaymentInfoService) {
    this.view = view;
    this.API = api;
  }

  init(year: string): void {
    this.API.getAll(year).then(this.setAll);
  }

  protected setAll = (items: any[]): void => {
    this.items = items;
  };

  delete = (item: any): void => {
    this.API.delete(item).then(this.removeItemFromList);
    this.closeDeleteConfirmDialogOf(item);
  };

  private removeItemFromList = (item: any): void => {
    this.items = this.items.filter((i) => i.number !== item.number);
  };

  cancelDelete = (item: any): void => {
    this.closeDeleteConfirmDialogOf(item);
  };

  private closeDeleteConfirmDialogOf = (item: any): void => {
    item.dialog = false;
  };
}
