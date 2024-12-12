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
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";
import PaymentInfoList from "@/components/PaymentInfoList.vue";
import InvoiceService from "@/services/InvoiceService";
import {
  IInvoiceListPresenter,
  InvoiceListPresenter,
} from "@/presenters/InvoiceList";
import { View } from "@/presenters/PaymentInfoList";
const router = useRouter();

class MyView implements View {
  goTo(path: string | { name: string; params: any }) {
    router.push(path);
  }
}

const presenter: Ref<IInvoiceListPresenter> = ref(
  new InvoiceListPresenter(new MyView(), new InvoiceService())
);
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
