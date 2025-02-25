<template>
  <div v-if="invoice" class="edit-invoice">
    <div class="header">
      <h2>Unsave {{ invoice.documentType }} (edit mode)</h2>
    </div>

    <div class="form-section">
      <div class="form-grid">
        <!-- From Company Card -->
        <div class="card half-width">
          <div class="card-content">
            <div class="company-section">
              <div class="section-label">From Company</div>
              <div class="company-details">
                <input
                  class="form-input"
                  placeholder="Name"
                  v-model="invoice.fromCompany.name"
                />
                <input
                  class="form-input"
                  placeholder="Address"
                  v-model="invoice.fromCompany.address"
                />
                <div class="input-row">
                  <input
                    class="form-input"
                    placeholder="Tax Id"
                    v-model="invoice.fromCompany.taxId"
                  />
                  <input
                    class="form-input"
                    placeholder="Tel"
                    v-model="invoice.fromCompany.tel"
                  />
                </div>
              </div>
              <div class="company-logo">
                <img src="@/assets/logo.png" alt="Company Logo" />
              </div>
            </div>
          </div>
        </div>

        <!-- To Company Card -->
        <div class="card half-width">
          <div class="card-content">
            <div class="section-label">To Company</div>
            <div class="company-details">
              <input
                class="form-input"
                placeholder="Name"
                v-model="invoice.targetCompany.name"
              />
              <input
                class="form-input"
                placeholder="Address"
                v-model="invoice.targetCompany.address"
              />
              <div class="input-row">
                <base-input
                  id="to-tax-id"
                  label="Tax Id"
                  v-model="invoice.targetCompany.taxId"
                />
                <base-input
                  id="to-tel"
                  label="Tel"
                  v-model="invoice.targetCompany.tel"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Invoice Details Card -->
        <div class="card full-width">
          <div class="card-content">
            <div class="section-label">{{ invoice.documentType }} Details</div>
            <div class="details-grid">
              <!-- First Row: Invoice Number, Date, and PO -->
              <div
                class="input-group three-columns"
                v-if="invoice.hasInvoiceNumber"
              >
                <base-input
                  id="invoice-number"
                  label="Invoice Number"
                  v-model="invoice.invoiceNumber"
                />
                <div class="date-input-group">
                  <input
                    id="invoice-date"
                    class="form-input"
                    placeholder="Invoice Date"
                    v-model="invoice.invoiceDate"
                  />
                  <button
                    id="today-button"
                    class="action-button small primary"
                    @click="today"
                    title="Set Today's Date"
                  >
                    <span class="icon">📅</span>
                  </button>
                </div>
                <base-input
                  v-if="invoice.hasInvoiceNumber"
                  id="purchase-order-number"
                  label="Purchase Order Number"
                  v-model="invoice.purchaseOrderNumber"
                />
              </div>

              <!-- optional First Row: Quotation Number, Date -->
              <div
                class="input-group three-columns"
                v-if="invoice.hasQuotationNumber"
              >
                <base-input
                  id="quotation-number"
                  label="Quotation Number"
                  v-model="invoice.quotationNumber"
                />
                <div class="date-input-group">
                  <input
                    id="quotation-date"
                    class="form-input"
                    placeholder="Quotation Date"
                    v-model="invoice.quotationDate"
                  />
                  <button
                    id="today-button"
                    class="action-button small primary"
                    @click="today"
                    title="Set Today's Date"
                  >
                    <span class="icon">📅</span>
                  </button>
                </div>
              </div>

              <!-- optional First Row: Receipt Number, Date -->
              <div
                class="input-group three-columns"
                v-if="invoice.hasReceiptNumber"
              >
                <base-input
                  id="receipt-number"
                  label="Receipt Number"
                  v-model="invoice.receiptNumber"
                />
                <div class="date-input-group">
                  <input
                    id="receipt-date"
                    class="form-input"
                    placeholder="Receipt Date"
                    v-model="invoice.receiptDate"
                  />
                  <button
                    id="today-button"
                    class="action-button small primary"
                    @click="today"
                    title="Set Today's Date"
                  >
                    <span class="icon">📅</span>
                  </button>
                </div>
              </div>
              <!-- Second Row: Project, Remark, Currency -->
              <div class="input-group three-columns">
                <base-input
                  id="project"
                  label="Project"
                  v-model="invoice.projectName"
                />
                <base-input
                  id="remark"
                  label="Remark"
                  v-model="invoice.remark"
                />
                <div class="select-group">
                  <label for="currency">Currency</label>
                  <select
                    id="currency"
                    class="form-select"
                    v-model="invoice.currency"
                  >
                    <option
                      v-for="currency in invoice.getCurrencies()"
                      :key="currency"
                      :value="currency"
                    >
                      {{ currency }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Payment in its own row or could be added to another row -->
              <base-input
                id="payment"
                label="Payment"
                v-model="invoice.payment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-section">
      <table class="items-table">
        <thead>
          <tr>
            <th class="text-left">Item</th>
            <th class="text-right">Price</th>
            <th class="text-right">Amount</th>
            <th class="text-right">Total</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td class="text-left">
              <input
                class="form-input"
                placeholder="Item"
                v-model="item.name"
              />
            </td>
            <td class="text-right">
              <input
                class="form-input text-right"
                placeholder="Price"
                v-model="item.price"
              />
            </td>
            <td class="text-right">
              <input
                class="form-input text-right"
                placeholder="Amount"
                v-model="item.amount"
              />
            </td>
            <td class="text-right">{{ item.getTotal() }}</td>
            <td class="text-right actions-cell">
              <button
                class="action-button small green add-item"
                @click="addItem(item)"
                title="Add Item"
              >
                <span class="icon">⇧</span>
              </button>
              <button
                class="action-button small red remove-item"
                @click="removeItem(item)"
                title="Remove Item"
              >
                <span class="icon">✖</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Presenter from "../presenters/BillingDocumentPresenter";
import BaseInput from "../components/BaseInput.vue";
import BillingDocument from "../models/BillingDocument";
import LineItem from "../models/LineItem";

const props = defineProps<{
  presenter: Presenter<BillingDocument>;
}>();

const invoice = computed(() => props.presenter.billingDocument.value);

// Change this to a computed property instead of ref
const items = computed(() => invoice.value?.getItems() || []);

function today() {
  props.presenter.todayClicked();
}

function addItem(item: LineItem) {
  console.log("addItem", item);
  props.presenter.addItemClickedOn(item);
}

function removeItem(item: LineItem) {
  console.log("removeItem", item);
  props.presenter.removeItemClickedOn(item);
}
</script>
<style scoped>
h2 {
  font-weight: 500;
}

.action-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
  align-items: center;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  justify-content: center;
  margin: 4px;
  transition: background-color 0.2s;
}

.action-button.small {
  width: 40px;
  height: 40px;
}

.action-button.primary {
  background-color: var(--primary-color, #1976d2);
}

.action-button.green {
  background-color: var(--success-color, #4caf50);
}

.action-button.red {
  background-color: var(--error-color, #ff5252);
}

.action-button:hover {
  opacity: 0.8;
}

.action-button .icon {
  font-size: 1.2em;
}

.action-button.small .icon {
  font-size: 1em;
}

.edit-invoice {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.form-section {
  margin-bottom: 24px;
}

.form-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
}

.card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px;
}

.card.full-width {
  grid-column: span 2;
}

.card.half-width {
  grid-column: span 1;
}

.card-content {
  padding: 12px;
}

.section-label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.company-section {
  display: grid;
  gap: 16px;
  align-items: start;
}

.company-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.form-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9375rem;
  line-height: 1.4;
  height: 32px;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color, #1976d2);
}

.company-logo {
  width: 130px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}

.company-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .card.half-width {
    grid-column: span 2;
  }

  .input-row {
    grid-template-columns: 1fr;
  }
}

.details-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  align-items: center;
}

.date-input-group {
  display: flex;
  gap: 4px;
  align-items: center;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.select-group label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0;
}

.form-select {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9375rem;
  line-height: 1.4;
  height: 32px;
  background-color: white;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-color, #1976d2);
}

@media (max-width: 768px) {
  .input-group {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .date-input-group {
    width: 100%;
    gap: 4px;
  }

  .date-input-group .form-input {
    flex: 1;
  }

  .details-grid {
    gap: 6px;
  }
}

.table-section {
  margin-top: 24px;
  overflow-x: auto;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.items-table th,
.items-table td {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.items-table th {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.items-table .form-input {
  margin: 0;
  background: transparent;
}

.items-table .form-input.text-right {
  text-align: right;
}

.actions-cell {
  white-space: nowrap;
  width: 1%;
  padding-right: 16px;
}

@media (max-width: 768px) {
  .table-section {
    margin: 24px -20px 0;
    padding: 0 20px;
  }

  .items-table {
    font-size: 0.875rem;
  }

  .items-table th,
  .items-table td {
    padding: 8px;
  }
}

.input-group.three-columns {
  grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
  gap: 8px;
}

@media (max-width: 768px) {
  .input-group.three-columns {
    grid-template-columns: 1fr; /* Stack on mobile */
  }
}
</style>
