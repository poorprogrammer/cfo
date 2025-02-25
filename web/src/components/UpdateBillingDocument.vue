<template>
  <div class="invoice pa-3">
    <div v-if="loading">Loading Please wait...</div>
    <div v-else>
      <edit-billing-document v-bind:presenter="p"></edit-billing-document>
      <div class="no-print">
        <back-button
          v-bind:target="p.billingDocument.value.listUrl"
        ></back-button>
        <save-button @save="save"></save-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Presenter from "../presenters/BillingDocumentPresenter";
import EditBillingDocument from "../components/EditBillingDocument.vue";
import BackButton from "../components/BackButton.vue";
import SaveButton from "../components/SaveButton.vue";
import BillingDocument from "../models/BillingDocument";

const props = defineProps<{
  presenter: Presenter<BillingDocument>;
}>();

const route = useRoute();
const loading = ref(true);
const p = ref(props.presenter);

onMounted(async () => {
  try {
    const invoiceNumber = route.params.number as string;
    await p.value.init(invoiceNumber);
  } finally {
    loading.value = false;
  }
});

function save() {
  p.value.update();
}
</script>
