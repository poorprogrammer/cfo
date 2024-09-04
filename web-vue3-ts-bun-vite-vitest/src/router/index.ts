import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Invoices from "../views/Invoices.vue";
const currentYear = new Date().getFullYear();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: "invoicesThisYear" },
    },
    // {
    //   path: "/",
    //   name: "home",
    //   redirect: { name: "invoicesThisYear" },
    //   // beforeEnter: isAuthenticated,
    // },
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
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
