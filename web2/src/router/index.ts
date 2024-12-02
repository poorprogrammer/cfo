import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Invoices from "@/views/Invoices.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/invoices",
    name: "Invoices",
    component: Invoices,
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
