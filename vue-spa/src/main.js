import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store/index.js';
import './registerServiceWorker'
import interceptor from './helpers/httpInterceptor.js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap';
import VeeValidate from 'vee-validate';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faShoppingBag,
  faPlusCircle,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(faShoppingBag, faPlusCircle, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Logout Unauthorised Requests
interceptor();

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
