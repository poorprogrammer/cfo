<template>
  <div>
    <payment-info-list titleMsg="Invoice List" :presenter="presenter">
      <template #header>
        <button
          id="generate-receipt"
          class="icon-button"
          :class="presenter.buttonColor"
          @click="presenter.toggleGenerateReceipt()"
        >
          <span class="icon">≡</span>
        </button>
      </template>
      <template #col1="{ item }">
        <span class="selecting-invoices" v-if="presenter.isGeneratingReceipt">
          <input
            type="checkbox"
            v-model="presenter.selectedInvoices"
            :value="item"
          />
        </span>
      </template>
    </payment-info-list>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PaymentInfoList from "@/components/PaymentInfoList.vue"
import Presenter from "@/presenters/InvoiceList"
import API from "@/services/InvoiceService"

const router = useRouter()
const presenter = ref(new Presenter({ goTo: (path: string) => router.push(path) }, new API()))

</script>

<style scoped lang="scss">
.icon-button {
  padding: 8px;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 0.5em;

  &:hover {
    opacity: 0.8;
  }
}

.selecting-invoices {
  padding-right: 0.5em;
}
</style> 