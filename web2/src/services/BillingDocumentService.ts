import BillingDocument from "@/models/BillingDocument";

export default interface BillingDocumentService {
  getAll(year: number): Promise<BillingDocument[]>;
  get(number: string): Promise<BillingDocument>;
  save(item: BillingDocument): Promise<string>;
  delete(item: BillingDocument): Promise<BillingDocument>;
  update(item: BillingDocument): Promise<BillingDocument>;
}
