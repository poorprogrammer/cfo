import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Invoices from "@/views/Invoices.vue";
import DuplicatedInvoice from "@/views/DuplicatedInvoice.vue";
import UpdateInvoice from "@/views/UpdateInvoice.vue";
import Invoice from "@/views/Invoice.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    redirect: { name: "invoicesThisYear" },
    // beforeEnter: isAuthenticated,
  },
  {
    path: "/invoices",
    name: "invoicesThisYear",
    component: Invoices,
    // beforeEnter: isAuthenticated,
  },
  {
    path: "/invoices/:year",
    name: "invoices",
    component: Invoices,
    // beforeEnter: isAuthenticated,
  },
  {
    path: "/invoice/:number/duplicate",
    name: "duplicatedInvoice",
    component: DuplicatedInvoice,
    // beforeEnter: isAuthenticated,
  },
  {
    path: "/invoice/:number/edit",
    name: "updateInvoice",
    component: UpdateInvoice,
    // beforeEnter: isAuthenticated,
  },
  {
    path: "/invoice/:number",
    name: "invoice",
    component: Invoice,
    // beforeEnter: isAuthenticated,
  },
  {
    path: "/quotations",
    name: "Quotations",
    component: () => import("@/views/Quotations.vue"),
  },
  {
    path: "/receipts",
    name: "Receipts",
    component: () => import("@/views/Receipts.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
