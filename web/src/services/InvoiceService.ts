import BillingDocument from "@/models/BillingDocument";
import Invoice, { InvoiceData } from "@/models/Invoice";
import LineItem from "@/models/LineItem";
import axios, { AxiosResponse } from "axios";
import BillingDocumentService from "./BillingDocumentService";

export default class InvoiceService implements BillingDocumentService {
  protected root: string;

  constructor() {
    this.root = process.env.VUE_APP_BASE_API || "";
  }

  protected allUrl(year: number): string {
    return `${this.collectionUrl()}${year}`;
  }

  protected collectionUrl(): string {
    return `${this.root}/invoices/`;
  }

  protected itemUrl(invoiceNumber: string): string {
    return `${this.root}/invoice/${invoiceNumber}`;
  }

  getAll(year: number): Promise<Invoice[]> {
    return axios.get(this.allUrl(year)).then(this.parseAll);
  }

  get(invoiceNumber: string): Promise<Invoice> {
    return axios.get(this.itemUrl(invoiceNumber)).then(this.parseItem);
  }

  save(invoice: Invoice): Promise<string> {
    return axios
      .post(this.collectionUrl(), this.createNewInvoiceRequest(invoice))
      .then(this.parseNumber);
  }

  delete(invoice: Invoice): Promise<Invoice> {
    invoice.markAsDeleted();
    return this.update(invoice);
  }

  update(invoice: Invoice): Promise<Invoice> {
    const url = this.itemUrl(invoice.number);
    return axios.put(url, invoice.createDTO()).then(this.parseItem);
  }

  protected parseAll = (response: AxiosResponse<InvoiceData[]>): Invoice[] => {
    const invoices: Invoice[] = [];
    response.data.forEach((invoice: InvoiceData) => {
      invoices.push(this.createItem(invoice as InvoiceData) as Invoice);
    });
    return invoices;
  };

  protected parseItem = (response: AxiosResponse): Invoice => {
    return this.createItem(response.data) as Invoice;
  };

  protected parseNumber = (response: AxiosResponse<string, string>): string => {
    return response.data;
  };

  protected createItem(item: InvoiceData): BillingDocument {
    return new Invoice(item);
  }

  protected createNewInvoiceRequest = (invoice: Invoice): InvoiceData => {
    const dto = invoice.createDTO();
    delete dto.id;
    delete dto._id;
    return dto as InvoiceData;
  };
}
