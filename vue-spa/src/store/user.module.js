import UserService from '../services/user.service';
import Vue from 'vue';

export const user = {
  namespaced: true,
  state: {
    orders: [],
    ordersLoaded: false
  },
  getters: {
    getOrder: state => id => {
      return state.orders.find(order => order.id == id);
    },
    totalOrders: state => {
      return state.orders.length;
    }
  },
  actions: {
    getOrders({ state, commit }) {
      if(state.ordersLoaded) { return }
      return UserService.getUserOrders().then(
        response => {
          commit('updateOrders', response.data);
          commit('ordersLoaded', true);
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getOrder({ commit }, id) {
      return UserService.getUserOrder(id).then(
        response => {
          commit('updateOrders', response.data);

          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    clearOrders({commit}){
      commit('ordersLoaded', false);
      commit('updateOrders', []);
    },
    addNewOrder({commit}, newOrder) {
      return UserService.postNewOrder(newOrder).then(
        response => {
          commit('ordersLoaded', false);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    updateOrders(state, orders) {
      Vue.set(state, 'orders', [...orders]);
    },
    ordersLoaded: (state, status) => {
      state.ordersLoaded = status;
    },
  }
};