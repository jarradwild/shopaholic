import AdminService from '../services/admin.service';

export const admin = {
  namespaced: true,
  state: {
    orders: [],
    ordersLoaded: false
  },
  getters: {
    getOrder: state => id => {
      return state.orders.find(order => order.id == id);
    },
    getOrderIndex: state => id => {
      return state.orders.findIndex(order => order.id == id);
    },
    totalOrders: state => {
      return state.orders.length;
    }
  },
  actions: {
    getOrders({ state, commit}) {
      if(state.ordersLoaded) { return }
      return AdminService.getOrders().then(
        response => {
          commit('updateOrders', response.data);
          commit('ordersLoaded', true);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    deleteOrder({ commit}, id) {
      return AdminService.deleteOrder(id).then(
        response => {
          commit('ordersLoaded', false);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    updateStatus({commit}, payload) {
      return AdminService.updateOrderStatus(payload).then(
        response => {
          commit('updateStatus', payload);
          commit('ordersLoaded', false);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    addNote({commit}, payload) {
      return AdminService.addOrderNote(payload).then(
        response => {
          commit('updateNotes', {index: payload.index, notes: response.data.order.notes});
          commit('ordersLoaded', false);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    clearOrders({commit}){
      commit('updateOrders', null);
      commit('ordersLoaded', false);
    }
  },
  mutations: {
    updateOrders(state, orders) {
      state.orders = orders;
    },
    ordersLoaded: (state, status) => {
      state.ordersLoaded = status;
    },
    updateStatus(state, payload) {
      Object.assign(state.orders[payload.index], { status: payload.status })
    },
    updateNotes(state, payload) {
      Object.assign(state.orders[payload.index], { notes: payload.notes })
    }
  }
};