import { ref, Ref } from "vue";
import Invoice from "@/models/Invoice";
import LineItem from "@/models/LineItem";
import InvoiceService from "@/services/InvoiceService";

export default class InvoicePresenter {
  view: any;
  API: InvoiceService;
  invoice: Ref<Invoice>;
  constructor(view: any, api: InvoiceService) {
    this.view = view;
    this.invoice = ref(new Invoice()) as Ref<Invoice>;
    this.API = api;
  }
  async init(invoiceNumber: string): Promise<void> {
    const invoiceData = await this.API.get(invoiceNumber);
    this.invoice.value = new Invoice(invoiceData);
  }
  save() {
    this.API.save(this.invoice.value).then(
      (invoiceNumber) => {
        this.view.goTo(this.getPrintPageParameters(invoiceNumber));
      },
      (error) => {
        this.showError(error);
      }
    );
  }
  update() {
    this.API.update(this.invoice.value).then(
      (invoice) => {
        this.view.goTo(this.getPrintPageParameters(invoice.number));
      },
      (error) => {
        this.showError(error);
      }
    );
  }
  getPrintPageParameters(invoiceNumber: string) {
    return {
      name: this.invoice.value.documentType.toLowerCase(),
      params: { number: invoiceNumber },
    };
  }
  addItemClickedOn(item: LineItem) {
    this.invoice.value.addItemBefore(item);
  }
  removeItemClickedOn(item: LineItem) {
    this.invoice.value.removeItem(item);
  }
  todayClicked() {
    this.invoice.value.setDateToday();
  }
  showError(error: string) {
    alert(error);
  }
}
