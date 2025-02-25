<template>
  <div class="invoice pa-3">
    <div v-if="!document">Loading Please wait...</div>
    <div v-else>
      <edit-billing-document
        v-bind:presenter="props.presenter"
      ></edit-billing-document>
      <div class="no-print">
        <back-button v-bind:target="document.listUrl"></back-button>
        <save-button @save="save"></save-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Presenter from "../presenters/BillingDocumentPresenter";
import EditBillingDocument from "../components/EditBillingDocument.vue";
import BackButton from "../components/BackButton.vue";
import SaveButton from "../components/SaveButton.vue";
import BillingDocument from "../models/BillingDocument";
const props = defineProps<{
  presenter: Presenter<BillingDocument>;
}>();

const document = computed(() => props.presenter.billingDocument);

function save() {
  props.presenter.save();
}
</script>
