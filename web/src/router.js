import Vue from 'vue'
import Router from 'vue-router'
import Invoices from './views/Invoices.vue'
import Invoice from './views/Invoice.vue'
import Login from './views/Login.vue'
import PageNotFound from './views/PageNotFound.vue'
import DuplicatedInvoice from './views/DuplicatedInvoice.vue'
import UpdateInvoice from './views/UpdateInvoice.vue'
import Quotations from './views/Quotations.vue'
import Quotation from './views/Quotation.vue'
import UpdateQuotation from './views/UpdateQuotation.vue'
import DuplicatedQuotation from './views/DuplicatedQuotation.vue'
import Receipts from './views/Receipts.vue'
import Receipt from './views/Receipt.vue'
import DuplicatedReceipt from './views/DuplicatedReceipt.vue'
import CreateReceipt from './views/CreateReceipt.vue'
import UpdateReceipt from './views/UpdateReceipt.vue'

Vue.use(Router)

const isAuthenticated = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Invoices,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/invoices/:year?',
      name: 'invoices',
      component: Invoices,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/invoice/:number/duplicate',
      name: 'duplicatedInvoice',
      component: DuplicatedInvoice,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/invoice/:number/edit',
      name: 'updateInvoice',
      component: UpdateInvoice,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/invoice/:number',
      name: 'invoice',
      component: Invoice,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/receipts/:year?',
      name: 'receipts',
      component: Receipts,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/receipt/create',
      name: 'createReceipt',
      component: CreateReceipt,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/receipt/:number',
      name: 'receipt',
      component: Receipt,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/receipt/:number/duplicate',
      name: 'duplicatedReceipt',
      component: DuplicatedReceipt,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/receipt/:number/edit',
      name: 'UpdateReceipt',
      component: UpdateReceipt,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/quotation/:number/duplicate',
      name: 'duplicatedQuotation',
      component: DuplicatedQuotation,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/quotations/:year?',
      name: 'quotations',
      component: Quotations,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/quotation/:number',
      name: 'quotation',
      component: Quotation,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/quotation/:number/edit',
      name: 'UpdateQuotation',
      component: UpdateQuotation,
      beforeEnter: isAuthenticated,
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
