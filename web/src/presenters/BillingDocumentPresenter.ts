import { ref, Ref } from "vue";
import LineItem from "@/models/LineItem";
import BillingDocumentService from "@/services/BillingDocumentService";
import { View } from "./BillingArchivePresenter";
import BillingDocument from "@/models/BillingDocument";

export default class BillingDocumentPresenter<T extends BillingDocument> {
  view: View;
  API: BillingDocumentService;
  billingDocument: Ref<T>;
  documentFactory: new (data?: any) => T;

  constructor(
    view: View,
    api: BillingDocumentService,
    documentFactory: new (data?: any) => T
  ) {
    this.view = view;
    this.API = api;
    this.billingDocument = ref(new documentFactory()) as Ref<T>;
    this.documentFactory = documentFactory;
  }

  async init(documentNumber: string): Promise<void> {
    const documentData = await this.API.get(documentNumber);
    this.billingDocument.value = new this.documentFactory(documentData);
  }

  save() {
    this.API.save(this.billingDocument.value).then(
      (documentNumber: string) => {
        this.view.goTo(this.getPrintPageParameters(documentNumber));
      },
      (error: string) => {
        this.showError(error);
      }
    );
  }

  update() {
    this.API.update(this.billingDocument.value).then(
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
      name: this.billingDocument.value.documentType.toLowerCase(),
      params: { number: documentNumber },
    };
  }

  addItemClickedOn(item: LineItem) {
    console.log("addItemClickedOn", item);
    this.billingDocument.value.addItemBefore(item);
    console.log("billingDocument.value", this.billingDocument.value);
  }

  removeItemClickedOn(item: LineItem) {
    this.billingDocument.value.removeItem(item);
  }

  todayClicked() {
    this.billingDocument.value.setDateToday();
  }

  showError(error: string) {
    alert(error);
  }
}
