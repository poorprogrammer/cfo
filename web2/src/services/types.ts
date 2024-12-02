export interface PaymentInfoItem {
  id?: string;
  number: string;
  dialog?: boolean;
  [key: string]: any;
}

export interface PaymentInfoService {
  getAll(year: string): Promise<PaymentInfoItem[]>;
  get(number: string): Promise<PaymentInfoItem>;
  save(item: PaymentInfoItem): Promise<string>;
  delete(item: PaymentInfoItem): Promise<PaymentInfoItem>;
  update(item: PaymentInfoItem): Promise<PaymentInfoItem>;
}
