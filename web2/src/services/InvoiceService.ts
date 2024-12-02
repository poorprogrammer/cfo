import axios from "axios";
import type { PaymentInfoService, PaymentInfoItem } from "./types";

export class InvoiceService implements PaymentInfoService {
  protected root: string;

  constructor() {
    this.root = process.env.VUE_APP_BASE_API || "";
  }

  private allUrl(year: string): string {
    return `${this.collectionUrl()}${year}`;
  }

  protected collectionUrl(): string {
    return `${this.root}/invoices/`;
  }

  protected itemUrl(invoiceNumber: string): string {
    return `${this.root}/invoice/${invoiceNumber}`;
  }

  async getAll(year: string): Promise<PaymentInfoItem[]> {
    const response = await axios.get(this.allUrl(year));
    return this.parseAll(response);
  }

  async get(invoiceNumber: string): Promise<PaymentInfoItem> {
    const response = await axios.get(this.itemUrl(invoiceNumber));
    return this.parseItem(response);
  }

  async save(invoice: PaymentInfoItem): Promise<string> {
    const response = await axios.post(
      this.collectionUrl(),
      this.createDTO(invoice)
    );
    return this.parseNumber(response);
  }

  async delete(invoice: PaymentInfoItem): Promise<PaymentInfoItem> {
    invoice.deleted = true;
    return this.update(invoice);
  }

  async update(invoice: PaymentInfoItem): Promise<PaymentInfoItem> {
    const response = await axios.put(
      this.itemUrl(invoice.number),
      this.createDTO(invoice)
    );
    return this.parseItem(response);
  }

  private parseAll(response: any): PaymentInfoItem[] {
    return response.data.map((item: any) => this.createItem(item));
  }

  private parseItem(response: any): PaymentInfoItem {
    return this.createItem(response.data);
  }

  private parseNumber(response: any): string {
    return response.data;
  }

  protected createItem(item: any): PaymentInfoItem {
    return item;
  }

  private createDTO(invoice: PaymentInfoItem): any {
    const dto = { ...invoice };
    if (dto.items) {
      dto.items.forEach((item: any) => {
        delete item.item;
      });
    }
    return dto;
  }
}
