import { ref, Ref } from "vue";
import Invoice from "@/models/Invoice";
import LineItem from "@/models/LineItem";
import BillingDocumentService from "@/services/BillingDocumentService";
import { View } from "./BillingArchivePresenter";
import BillingDocument from "@/models/BillingDocument";

export default class BillingDocumentPresenter {
  view: View;
  API: BillingDocumentService;
  billingDocument: Ref<Invoice>;
  constructor(view: View, api: BillingDocumentService) {
    this.view = view;
    this.billingDocument = ref(new Invoice()) as Ref<Invoice>;
    this.API = api;
  }
  async init(invoiceNumber: string): Promise<void> {
    const invoiceData = await this.API.get(invoiceNumber);
    this.billingDocument.value = new Invoice(invoiceData);
  }
  save() {
    this.API.save(this.billingDocument.value).then(
      (invoiceNumber: string) => {
        this.view.goTo(this.getPrintPageParameters(invoiceNumber));
      },
      (error: string) => {
        this.showError(error);
      }
    );
  }
  update() {
    this.API.update(this.billingDocument.value).then(
      (invoice: BillingDocument) => {
        this.view.goTo(this.getPrintPageParameters(invoice.number));
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
    this.billingDocument.value.addItemBefore(item);
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
