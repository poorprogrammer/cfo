// export interface PaymentInfoItem {
//   id?: string;
//   number: string;
//   dialog?: boolean;
//   [key: string]: any;
// }

import BillingDocument from "@/models/BillingDocument";

export interface PaymentInfoService {
  getAll(year: string): Promise<BillingDocument[]>;
  get(number: string): Promise<BillingDocument>;
  save(item: BillingDocument): Promise<string>;
  delete(item: BillingDocument): Promise<BillingDocument>;
  update(item: BillingDocument): Promise<BillingDocument>;
}
