import LineItem from "@/models/LineItem";
import BillingDocumentService from "@/services/BillingDocumentService";
import { View } from "./BillingArchivePresenter";
import BillingDocument from "@/models/BillingDocument";

export default class BillingDocumentPresenter<T extends BillingDocument> {
  view: View;
  API: BillingDocumentService;
  billingDocument: T;
  documentFactory: new (data?: any) => T;

  constructor(
    view: View,
    api: BillingDocumentService,
    documentFactory: new (data?: any) => T
  ) {
    this.view = view;
    this.API = api;
    this.billingDocument = new documentFactory();
    this.documentFactory = documentFactory;
  }

  async init(documentNumber: string): Promise<void> {
    const documentData = await this.API.get(documentNumber);
    this.billingDocument = new this.documentFactory(documentData);
  }

  save() {
    this.API.save(this.billingDocument).then(
      (documentNumber: string) => {
        this.view.goTo(this.getPrintPageParameters(documentNumber));
      },
      (error: string) => {
        this.showError(error);
      }
    );
  }

  update() {
    this.API.update(this.billingDocument).then(
      (document: BillingDocument) => {
        this.view.goTo(this.getPrintPageParameters(document.number));
      },
      (error: string) => {
        this.showError(error);
      }
    );
  }

  getPrintPageParameters(documentNumber: string) {
    return {
      name: this.billingDocument.documentType.toLowerCase(),
      params: { number: documentNumber },
    };
  }

  addItemClickedOn(item: LineItem) {
    console.log("addItemClickedOn", item);
    this.billingDocument.addItemBefore(item);
    console.log("billingDocument.value", this.billingDocument);
  }

  removeItemClickedOn(item: LineItem) {
    this.billingDocument.removeItem(item);
  }

  todayClicked() {
    this.billingDocument.setDateToday();
  }

  showError(error: string) {
    alert(error);
  }
}
