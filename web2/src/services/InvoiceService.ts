import axios, { AxiosResponse } from "axios";
import BillingDocument from "@/models/BillingDocument";
import Invoice from "@/models/Invoice";
import { PaymentInfoService } from "./types";
import LineItem from "@/models/LineItem";

export default class InvoiceService implements PaymentInfoService {
  protected root: string;

  constructor() {
    this.root = process.env.VUE_APP_BASE_API;
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
    return axios.put(url, this.createDTO(invoice)).then(this.parseItem);
  }

  protected parseAll = (response: AxiosResponse): Invoice[] => {
    const invoices: Invoice[] = [];
    response.data.forEach((invoice: any) => {
      invoices.push(this.createItem(invoice) as unknown as Invoice);
    });
    return invoices;
  };

  protected parseItem = (response: AxiosResponse): Invoice => {
    return this.createItem(response.data) as unknown as Invoice;
  };

  protected parseNumber = (response: AxiosResponse): string => {
    return response.data;
  };

  protected createItem(item: any): BillingDocument {
    return new Invoice(item);
  }

  protected createDTO = (invoice: Invoice): any => {
    const dto: any = {};
    Object.assign(dto, invoice);
    dto.currency = invoice.currency;
    delete dto._currencies;
    if (!invoice.items) return dto;
    dto.items = [];
    invoice.items.forEach((item: LineItem) => {
      dto.items.push({
        name: item.name,
        price: item.price,
        amount: item.amount,
      });
    });
    return dto;
  };
  protected createNewInvoiceRequest = (invoice: Invoice): any => {
    const dto: any = this.createDTO(invoice);
    delete dto.id;
    delete dto._id;
    return dto;
  };
}
