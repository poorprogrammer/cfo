import Invoice from "@/models/Invoice";
import LineItem from "@/models/LineItem";
import InvoiceService from "@/services/InvoiceService";

export default class InvoicePresenter {
  view: any;
  API: InvoiceService;
  invoice: Invoice;
  constructor(view: any, api: InvoiceService) {
    this.view = view;
    this.invoice = new Invoice();
    this.API = api;
  }
  init(invoiceNumber: string) {
    this.API.get(invoiceNumber).then(
      (invoice) => (this.invoice = new Invoice(invoice))
    );
  }
  save() {
    this.API.save(this.invoice).then(
      (invoiceNumber) => {
        this.view.goTo(this.getPrintPageParameters(invoiceNumber));
      },
      (error) => {
        this.showError(error);
      }
    );
  }
  update() {
    this.API.update(this.invoice).then(
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
      name: this.invoice.documentType.toLowerCase(),
      params: { number: invoiceNumber },
    };
  }
  addItemClickedOn(item: LineItem) {
    this.invoice.addItemBefore(item);
  }
  removeItemClickedOn(item: LineItem) {
    this.invoice.removeItem(item);
  }
  todayClicked() {
    this.invoice.setDateToday();
  }
  showError(error: string) {
    alert(error);
  }
}
