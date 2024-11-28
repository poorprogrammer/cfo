<template>
  <div v-if="p.invoice" class="edit-invoice">
    <div class="header">
      <h2>Unsave {{ p.invoice.documentType }} (edit mode)</h2>
    </div>

    <div class="form-section">
      <div class="form-grid">
        <!-- From Company Card -->
        <div class="card full-width">
          <div class="card-content">
            <div class="company-section">
              <div class="section-label">From Company</div>
              <div class="company-details">
                <input
                  class="form-input"
                  placeholder="Name"
                  v-model="p.invoice.fromCompany.name"
                />
                <input
                  class="form-input"
                  placeholder="Address"
                  v-model="p.invoice.fromCompany.address"
                />
                <div class="input-row">
                  <input
                    class="form-input"
                    placeholder="Tax Id"
                    v-model="p.invoice.fromCompany.taxId"
                  />
                  <input
                    class="form-input"
                    placeholder="Tel"
                    v-model="p.invoice.fromCompany.tel"
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
                v-model="p.invoice.targetCompany.name"
              />
              <input
                class="form-input"
                placeholder="Address"
                v-model="p.invoice.targetCompany.address"
              />
              <div class="input-row">
                <base-input
                  id="to-tax-id"
                  label="Tax Id"
                  v-model="p.invoice.targetCompany.taxId"
                />
                <base-input
                  id="to-tel"
                  label="Tel"
                  v-model="p.invoice.targetCompany.tel"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Invoice Details Card -->
        <div class="card half-width">
          <div class="card-content">
            <div class="section-label">Invoice Details</div>
            <div class="details-grid">
              <!-- Invoice Number & Date -->
              <div v-if="p.invoice.hasInvoiceNumber" class="input-group">
                <base-input
                  id="invoice-number"
                  label="Invoice Number"
                  v-model="p.invoice.invoiceNumber"
                />
                <div class="date-input-group">
                  <input
                    id="invoice-date"
                    class="form-input"
                    placeholder="Invoice Date"
                    v-model="p.invoice.invoiceDate"
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

              <!-- Receipt Number & Date -->
              <div v-if="p.invoice.hasReceiptNumber" class="input-group">
                <base-input
                  id="receipt-number"
                  label="Receipt Number"
                  v-model="p.invoice.receiptNumber"
                />
                <div class="date-input-group">
                  <input
                    id="receipt-date"
                    class="form-input"
                    placeholder="Receipt Date"
                    v-model="p.invoice.receiptDate"
                  />
                </div>
              </div>

              <!-- Quotation Number & Date -->
              <div v-if="!p.invoice.hasReceiptNumber" class="input-group">
                <base-input
                  id="quotation-number"
                  label="Quotation Number"
                  v-model="p.invoice.quotationNumber"
                />
                <div class="date-input-group">
                  <input
                    id="quotation-date"
                    class="form-input"
                    placeholder="Quotation Date"
                    v-model="p.invoice.quotationDate"
                  />
                </div>
              </div>

              <!-- Purchase Order -->
              <base-input
                v-if="p.invoice.hasInvoiceNumber"
                id="purchase-order-number"
                label="Purchase Order Number"
                v-model="p.invoice.purchaseOrderNumber"
              />

              <!-- Project & Remark -->
              <base-input
                id="project"
                label="Project"
                v-model="p.invoice.projectName"
              />
              <base-input
                id="remark"
                label="Remark"
                v-model="p.invoice.remark"
              />

              <!-- Currency Selection -->
              <div class="select-group">
                <label for="currency">Currency</label>
                <select
                  id="currency"
                  class="form-select"
                  v-model="p.invoice.currency"
                >
                  <option
                    v-for="currency in p.invoice.getCurrencies()"
                    :key="currency"
                    :value="currency"
                  >
                    {{ currency }}
                  </option>
                </select>
              </div>

              <!-- Payment -->
              <base-input
                id="payment"
                label="Payment"
                v-model="p.invoice.payment"
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
          <tr v-for="(item, index) in p.invoice.getItems()" :key="index">
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
<script>
import Presenter from "@/presenters/Invoice";
import BaseInput from "@/components/BaseInput.vue";

export default {
  name: "editInvoice",
  props: { presenter: Presenter },
  components: { BaseInput },
  mounted() {
    this.p = this.presenter;
  },
  data() {
    return {
      p: this.p,
    };
  },
  methods: {
    today: function () {
      this.p.todayClicked();
    },
    addItem: function (item) {
      this.p.addItemClickedOn(item);
    },
    removeItem: function (item) {
      this.p.removeItemClickedOn(item);
    },
  },
};
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
  padding: 16px;
}

.card.full-width {
  grid-column: span 2;
}

.card.half-width {
  grid-column: span 1;
}

.card-content {
  padding: 16px;
}

.section-label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}

.company-section {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
}

.company-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color, #1976d2);
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
  gap: 16px;
}

.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.date-input-group {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.select-group label {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}

.form-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
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
  }

  .date-input-group {
    width: 100%;
  }

  .date-input-group .form-input {
    flex: 1;
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
</style>
