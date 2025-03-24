import { CustomWorld } from "./world";
import BillingArchivePage from "../../tests/web/pages/BillingArchivePage";

/**
 * ลบใบแจ้งหนี้ (Invoice)
 * @param invoice หมายเลขใบแจ้งหนี้
 * @param customWorld world object ที่เก็บ browser และ context
 */
export async function deleteInvoice(invoice: string, customWorld: CustomWorld) {
  try {
    await customWorld.invoiceArchivePage.visit(2020);
    const exists = await customWorld.invoiceArchivePage.containsDocument(
      invoice
    );

    console.log(`🗑️ Deleting invoice: ${invoice}`);
    await customWorld.invoiceArchivePage.delete(invoice);
    await customWorld.invoiceArchivePage.shouldNotContainDocument(invoice);
  } catch (error) {
    console.warn(`⚠️ Invoice ${invoice} not found, skipping delete.`);
  }
}

/**
 * ลบใบเสร็จรับเงิน (Receipt)
 * @param receipt หมายเลขใบเสร็จรับเงิน
 * @param customWorld world object ที่เก็บ browser และ context
 */
export async function deleteReceipt(receipt: string, customWorld: CustomWorld) {
  try {
    const receiptArchivePage = new BillingArchivePage(
      customWorld.page,
      "Receipt"
    );
    await receiptArchivePage.visit(new Date().getFullYear());
    const exists = await receiptArchivePage.containsDocument(receipt);
    console.log(`🗑️ Deleting receipt: ${receipt}`);
    await receiptArchivePage.delete(receipt);
    await receiptArchivePage.shouldNotContainDocument(receipt);
  } catch (error) {
    console.warn(`⚠️ Receipt ${receipt} not found, skipping delete.`);
  }
}
