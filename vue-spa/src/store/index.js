import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { user } from './user.module';
import { admin } from './admin.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    admin
  }
});