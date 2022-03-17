<template>
  <div>
    <payment-info-list titleMsg="Quotation List" v-bind:presenter="p" />
  </div>
</template>

<script>
// @ is an alias to /src
import PaymentInfoList from "@/components/PaymentInfoList.vue";
import Presenter from "@/presenters/PaymentInfoList";
import API from "@/services/quotations";

export default {
  name: "QuotationsView",
  components: { PaymentInfoList },
  data() {
    return {
      p: new Presenter(this, new API()),
    };
  },
};
</script>
