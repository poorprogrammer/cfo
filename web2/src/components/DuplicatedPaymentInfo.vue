<template>
  <div class="invoice pa-3">
    <div v-if="!invoice">Loading Please wait...</div>
    <div v-else>
      <edit-invoice v-bind:presenter="props.presenter"></edit-invoice>
      <div class="no-print">
        <back-button v-bind:target="invoice.listUrl"></back-button>
        <save-button @save="save"></save-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Presenter from "@/presenters/BillingDocumentPresenter";
import EditInvoice from "@/components/EditInvoice.vue";
import BackButton from "@/components/BackButton.vue";
import SaveButton from "@/components/SaveButton.vue";

const props = defineProps<{
  presenter: Presenter;
}>();

const invoice = computed(() => props.presenter.billingDocument.value);

function save() {
  props.presenter.save();
}
</script>
