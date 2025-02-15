import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import Invoices from "@/views/Invoices.vue";
import DuplicatedInvoice from "@/views/DuplicatedInvoice.vue";
import UpdateInvoice from "@/views/UpdateInvoice.vue";
import Invoice from "@/views/Invoice.vue";
import Login from "@/views/Login.vue";

const isAuthenticated = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  console.log("enter isAuthenticated");
  if (localStorage.getItem("token")) {
    next();
    return;
  }
  next({ name: "login" });
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    redirect: { name: "invoicesThisYear" },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/invoices",
    name: "invoicesThisYear",
    component: Invoices,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/invoices/:year",
    name: "invoices",
    component: Invoices,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/invoice/:number/duplicate",
    name: "duplicatedInvoice",
    component: DuplicatedInvoice,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/invoice/:number/edit",
    name: "updateInvoice",
    component: UpdateInvoice,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/invoice/:number",
    name: "invoice",
    component: Invoice,
    beforeEnter: isAuthenticated,
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
