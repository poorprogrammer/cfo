import DuplicateInvoice from "@/views/DuplicateInvoice.vue";
import DuplicateQuotation from "@/views/DuplicateQuotation.vue";
import DuplicateReceipt from "@/views/DuplicateReceipt.vue";
import Invoice from "@/views/Invoice.vue";
import Invoices from "@/views/Invoices.vue";
import Quotation from "@/views/Quotation.vue";
import Quotations from "@/views/Quotations.vue";
import Receipt from "@/views/Receipt.vue";
import Receipts from "@/views/Receipts.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import UpdateInvoice from "@/views/UpdateInvoice.vue";
import UpdateQuotation from "@/views/UpdateQuotation.vue";
import UpdateReceipt from "@/views/UpdateReceipt.vue";
import CreateReceipt from "@/views/CreateReceipt.vue";
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import {
  initKeycloak,
  login,
  hasRequiredGroup,
} from "@/services/KeycloakService";

const isAuthenticated = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  try {
    const kc = await initKeycloak();
    if (kc.authenticated) {
      if (hasRequiredGroup(kc)) {
        next();
      } else {
        console.error("User does not have required permissions");
        await kc.logout({
          redirectUri: window.location.origin,
        });
      }
    } else {
      await login();
    }
  } catch (error) {
    console.error("Failed to initialize Keycloak:", error);
    next({ path: "/404" });
  }
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
    component: DuplicateInvoice,
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
    component: DuplicateQuotation,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/quotation/:number/edit",
    name: "UpdateQuotation",
    component: UpdateQuotation,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/quotation/:number",
    name: "quotation",
    component: Quotation,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/receipts",
    name: "Receipts",
    component: () => import("@/views/Receipts.vue"),
  },
  {
    path: "/receipts/:year?",
    name: "receipts",
    component: Receipts,
    beforeEnter: [isAuthenticated, handleOptionalYear],
  },
  {
    path: "/receipt/:number/duplicate",
    name: "duplicateReceipt",
    component: DuplicateReceipt,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/receipt/:number/edit",
    name: "updateReceipt",
    component: UpdateReceipt,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/receipt/:number",
    name: "receipt",
    component: Receipt,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/receipt/create",
    name: "createReceipt",
    component: CreateReceipt,
    beforeEnter: isAuthenticated,
    props: true,
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
