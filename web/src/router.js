import Vue from 'vue'
import Router from 'vue-router'
import Invoices from './views/Invoices.vue'
import Invoice from './views/Invoice.vue'
import PageNotFound from './views/PageNotFound.vue'
import DuplicatedInvoice from './views/DuplicatedInvoice.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Invoices
    },
    {
      path: '/invoices',
      name: 'invocies',
      component: Invoices
    },
    {
      path: '/invoice/:invoiceNumber/duplicate',
      name: 'duplicatedInvoice',
      component: DuplicatedInvoice
    },
    {
      path: '/invoice/:invoiceNumber',
      name: 'invoice',
      component: Invoice
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
