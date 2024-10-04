import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import Invoices from "../views/Invoices.vue";
const currentYear = new Date().getFullYear();

const isAuthenticated = (to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
    return;
  }
  next("/login");
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      redirect: { name: "invoicesThisYear" },
      beforeEnter: isAuthenticated,
    },
    {
      path: "/invoices/",
      name: "invoicesThisYear",
      redirect: { name: "invoices", params: { year: currentYear } },
      // beforeEnter: isAuthenticated,
    },
    {
      path: "/invoices/:year",
      name: "invoices",
      component: Invoices,
      // beforeEnter: isAuthenticated,
    },
    // {
    //   path: "/invoice/:number/duplicate",
    //   name: "duplicatedInvoice",
    //   component: DuplicatedInvoice,
    //   beforeEnter: isAuthenticated,
    // },
    // {
    //   path: "/invoice/:number/edit",
    //   name: "updateInvoice",
    //   component: UpdateInvoice,
    //   beforeEnter: isAuthenticated,
    // },
    // {
    //   path: "/invoice/:number",
    //   name: "invoice",
    //   component: Invoice,
    //   beforeEnter: isAuthenticated,
    // },

  ]
})

export default router
