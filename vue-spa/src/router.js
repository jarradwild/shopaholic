import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import NotFound from './views/NotFound.vue';

import store from './store/index.js'
import isLoggedIn from './middleware/isLoggedIn';
import isAdmin from './middleware/isAdmin';
import middlewarePipeline from './middleware/middlewarePipeline';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/my-orders',
      name: 'my-orders',
      meta: {
          middleware: [
            isLoggedIn
          ]
      },
      // lazy-loaded
      component: () => import('./views/customer/Orders.vue')
    },
    {
      path: '/my-orders/:id',
      name: 'view-order',
      meta: {
          middleware: [
            isLoggedIn
          ]
      },
      // lazy-loaded
      component: () => import('./views/customer/ViewOrder.vue')
    },
    {
      path: '/new-order',
      name: 'new-order',
      meta: {
          middleware: [
            isLoggedIn
          ]
      },
      // lazy-loaded
      component: () => import('./views/customer/NewOrder.vue')
    },
    {
      path: '/my-account',
      name: 'my-account',
      meta: {
          middleware: [
            isLoggedIn
          ]
      },
      // lazy-loaded
      component: () => import('./views/customer/MyAccount.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
          middleware: [
            isLoggedIn,
            isAdmin
          ]
      },
      // lazy-loaded
      component: () => import('./views/admin/Orders.vue')
    },
    {
      path: '/admin/order/:id',
      name: 'admin-edit-order',
      // lazy-loaded
      component: () => import('./views/admin/EditOrder.vue')
    },
    {
      path :'*',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware

  const context = {
      to,
      from,
      next,
      store
  }


  return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1)
  })

})

export default router;