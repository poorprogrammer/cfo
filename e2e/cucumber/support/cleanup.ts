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
    await customWorld.invoiceArchivePage.containsDocument(invoice);

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
export async function deleteInvoiceReceipt(receipt: string, customWorld: CustomWorld) {
  try {
    const receiptArchivePage = new BillingArchivePage(
      customWorld.page,
      "Receipt"
    );
    await receiptArchivePage.visit(new Date().getFullYear());
    await receiptArchivePage.containsDocument(receipt);
    console.log(`🗑️ Deleting receipt: ${receipt}`);
    await receiptArchivePage.delete(receipt);
    await receiptArchivePage.shouldNotContainDocument(receipt);
  } catch (error) {
    console.warn(`⚠️ Receipt ${receipt} not found, skipping delete.`);
  }
}

/**
 * ลบใบเสนอราคา (Quotation)
 * @param quotation หมายเลขใบเสนอราคา
 * @param customWorld world object ที่เก็บ browser และ context
 */
export async function deleteQuotation(
  quotation: string,
  customWorld: CustomWorld
) {
  try {
    await customWorld.invoiceArchivePage.visit(2020);
    await customWorld.invoiceArchivePage.containsDocument(quotation);
    console.log(`🗑️ Deleting quotation: ${quotation}`);
    await customWorld.invoiceArchivePage.delete(quotation);
    await customWorld.invoiceArchivePage.shouldNotContainDocument(quotation);
  } catch (error) {
    console.warn(`⚠️ Quotation ${quotation} not found, skipping delete.`);
  }
}


