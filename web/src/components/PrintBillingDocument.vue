<template>
  <div class="document">
    <div v-if="!document">Loading Please wait...</div>
    <div v-else>
      <div
        v-for="{ id, title, css } in document.getTitles()"
        :key="id"
        :class="css"
      >
        <div class="content-row">
          <div class="full-width">
            <div class="no-print">
              <span class="font-weight-bold">Filename: </span>
              {{ document.filename() }}
            </div>
            <div class="company-card from-company">
              <div class="company-content">
                <div class="company-details">
                  <p class="company-name">
                    {{ document.getFromCompanyName() }}
                  </p>
                  <p class="company-address">
                    {{ document.getFromCompanyAddress() }}
                  </p>
                  <p class="company-info">
                    <span class="label">Tax Id</span>
                    {{ document.getFromCompanyTaxId() }}
                    <span class="label">Tel</span>
                    {{ document.getFromCompanyTel() }}
                  </p>
                </div>

                <div class="company-logo">
                  <img
                    id="from-company-logo"
                    src="@/assets/logo.png"
                    alt="Company Logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="content-row center">
          <h2 class="heading">{{ title }}</h2>
        </div>

        <hr class="divider" />

        <div class="content-row">
          <div class="half-width left-pad">
            <p class="company-name" :class="document.targetCompanyNameClass()">
              {{ document.getTargetCompanyName() }}
            </p>
            <p class="company-address">
              {{ document.getTargetCompanyAddress() }}
            </p>
            <div class="company-info">
              <div class="info-grid">
                <base-text
                  label="Tax Id"
                  :value="document.getTargetCompanyTaxId()"
                />
                <base-text
                  label="Tel"
                  :value="document.getTargetCompanyTel()"
                />
              </div>
            </div>
          </div>
          <div class="half-width">
            <div class="invoice-details invoice-id">
              <div class="info-grid">
                <base-text
                  label="Quotation Number"
                  :value="document.quotationNumber"
                />
                <base-text
                  label="Quotation Date"
                  :value="document.quotationDate"
                />
                <base-text
                  label="Purchase Order Number"
                  :value="document.purchaseOrderNumber"
                />
                <base-text
                  label="Invoice Number"
                  :value="document.invoiceNumber"
                />
                <base-text label="Invoice Date" :value="document.invoiceDate" />
                <base-text
                  label="Receipt Number"
                  :value="document.receiptNumber"
                />
                <base-text label="Receipt Date" :value="document.receiptDate" />
                <base-text label="Remark" :value="document.remark" />
              </div>
            </div>
          </div>
        </div>

        <table class="simple-table" :class="document.tablePaddingClass()">
          <thead>
            <tr>
              <th scope="col" class="text-left">Item</th>
              <th scope="col" class="text-right">Price</th>
              <th scope="col" class="text-right">Amount</th>
              <th scope="col" class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in document.getItems()" :key="item.name">
              <td :class="document.itemClass()" class="item text-left">
                {{ item.name }}
              </td>
              <td :class="document.itemClass()" class="item text-right">
                {{ item.getPrice() }}
              </td>
              <td :class="document.itemClass()" class="item text-right">
                {{ item.amount }}
              </td>
              <td :class="document.itemClass()" class="item text-right">
                {{ item.getTotal() }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="content-row">
          <div v-if="document.payment" class="full-width">
            <div class="payment-info">
              {{ document.payment }}
            </div>
          </div>
        </div>

        <div class="signature-section">
          <div class="signature-container">
            <div class="signature-box">
              <div class="signature-space"></div>
              <hr class="signature-line" />
              <div class="signature-label">Customer Acceptance</div>
            </div>
            <div class="signature-box">
              <div class="signature-space"></div>
              <hr class="signature-line" />
              <div class="signature-label">Issued By</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-print" v-if="document">
      <back-button v-bind:target="document.listUrl"></back-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import BillingDocumentPresenter from "../presenters/BillingDocumentPresenter";
import BillingDocument from "../models/BillingDocument";
import BackButton from "../components/BackButton.vue";
import BaseText from "../components/BaseText.vue";

const props = defineProps<{
  presenter: BillingDocumentPresenter<BillingDocument>;
}>();

const route = useRoute();
const document = computed(() => props.presenter.billingDocument.value);

onMounted(async () => {
  const documentNumber = route.params.number as string;
  await props.presenter.init(documentNumber);
});
</script>

<style>
.invoice {
  padding: 1rem;
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: white;
}

.simple-table th {
  padding: 0.75rem;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
}

.simple-table td {
  padding: 0.75rem;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

/* Print styles */
@media print {
  html,
  body {
    width: 210mm;
    height: 297mm;
  }
  #from-company-logo {
    -webkit-print-color-adjust: exact;
  }
  div.print-only {
    display: block;
  }
  div.print-only.signature {
    display: flex;
  }
  .no-print {
    display: none;
  }
  .invoice-id {
    min-height: 220px;
  }
  .to-company {
    min-height: 220px;
  }
  .payment-info {
    margin-top: 30px;
  }
  td.item.small {
    padding: 2px;
    height: 24px;
  }
  main.v-main {
    padding: 0px !important;
  }
  .info-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
  .info-grid .base-text {
    font-size: 0.9em;
  }
  .info-grid .base-text span {
    white-space: nowrap;
  }
  .invoice-details {
    padding: 8px;
    min-height: auto;
  }
  .print-only {
    page-break-before: always !important;
    margin-top: 0;
  }
  .print-only:first-child {
    page-break-inside: avoid;
  }
}

.content-row {
  display: flex;
  margin-bottom: 16px;
}

.content-row.center {
  justify-content: center;
}

.full-width {
  width: 100%;
}

.half-width {
  width: 50%;
}

.left-pad {
  padding-left: 16px;
}

.company-card {
  padding: 16px;
  background: white;
}

.company-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.company-details {
  flex: 1;
}

.company-name {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.company-address {
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 8px;
}

.company-info {
  margin-bottom: 8px;
}

.label {
  font-weight: 500;
  margin-right: 8px;
}

.company-logo {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.divider {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  margin: 16px 0;
}

.invoice-details {
  padding: 16px;
  min-height: 230px;
}

.info-grid {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
}

.signature-section {
  width: 100%;
  margin-top: 30px;
  page-break-inside: avoid;
}

.signature-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
}

.signature-box {
  width: 50%; /* Fixed width instead of flex */
  border: 1px solid #000;
  padding: 16px;
  text-align: center;
}

.signature-space {
  height: 100px;
}

.signature-line {
  border: none;
  border-top: 1px solid #000;
  margin: 8px 0;
}

.signature-label {
  padding: 4px;
  font-weight: 500;
}

/* Keep existing print styles */
@media print {
  html,
  body {
    width: 210mm;
    height: 297mm;
  }
  #from-company-logo {
    -webkit-print-color-adjust: exact;
  }
  div.print-only {
    display: block;
  }
  div.print-only.signature {
    display: flex;
  }
  .no-print {
    display: none;
  }
  .invoice-id {
    min-height: 220px;
  }
  .to-company {
    min-height: 220px;
  }
  .payment-info {
    margin-top: 30px;
  }
  td.item.small {
    padding: 2px;
    height: 24px;
  }
  main.v-main {
    padding: 0px !important;
  }
  .info-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
  .info-grid .base-text {
    font-size: 0.9em;
  }
  .info-grid .base-text span {
    white-space: nowrap;
  }
  .invoice-details {
    padding: 8px;
    min-height: auto;
  }
  .print-only {
    page-break-before: always !important;
    margin-top: 0;
  }
  .print-only:first-child {
    page-break-inside: avoid;
  }
}
h2 {
  font-weight: 500;
}
div.v-image {
  height: 150px;
}
.print-only {
  display: none;
}
.invoice-id {
  min-height: 230px;
}
.title.small {
  font-size: 1rem !important;
  line-height: 1rem;
}
.v-application div.from-company div.v-list-item__content {
  align-self: center;
}
.v-application .from-company p {
  margin-bottom: 4px;
}
.payment-info {
  font-size: 0.8em;
}
h2.heading {
  font-size: 2rem;
}
</style>
