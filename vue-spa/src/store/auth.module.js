import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user: user.details }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit, dispatch }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user.details);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject('Unable to login. Please check your email address and password.');
        }
      );
    },
    logout({ commit, dispatch }) {
      AuthService.logout();
      dispatch('user/clearOrders', [], {root:true});
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refresh({commit}, user){
      return AuthService.refresh(user).then(
        response => {
          commit('loginRefresh');
          return Promise.resolve(response.data);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginRefresh(state) {
      state.status.loggedIn = true;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};