import DuplicatedInvoice from "@/views/DuplicatedInvoice.vue";
import DuplicatedQuotation from "@/views/DuplicatedQuotation.vue";
import Invoice from "@/views/Invoice.vue";
import Invoices from "@/views/Invoices.vue";
import Login from "@/views/Login.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import Quotations from "@/views/Quotations.vue";
import UpdateInvoice from "@/views/UpdateInvoice.vue";
import UpdateQuotation from "@/views/UpdateQuotation.vue";
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";

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

// Add a navigation guard to handle optional year parameter
const handleOptionalYear = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!to.params.year) {
    next({
      name: to.name as string,
      params: { ...to.params, year: new Date().getFullYear().toString() },
    });
  } else {
    next();
  }
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
    redirect: { name: "invoices" },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/invoices/:year?",
    name: "invoices",
    component: Invoices,
    beforeEnter: [isAuthenticated, handleOptionalYear],
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
    path: "/quotations/:year?",
    name: "quotations",
    component: Quotations,
    beforeEnter: [isAuthenticated, handleOptionalYear],
  },
  {
    path: "/quotation/:number/duplicate",
    name: "duplicatedQuotation",
    component: DuplicatedQuotation,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/quotation/:number/edit",
    name: "UpdateQuotation",
    component: UpdateQuotation,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/receipts",
    name: "Receipts",
    component: () => import("@/views/Receipts.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
