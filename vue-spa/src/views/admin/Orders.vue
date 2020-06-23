<template>
  <div>
      <b-container class="mb-5">
        <b-jumbotron header="All Orders">
          <p>View and manage customer orders.</p>
        </b-jumbotron>
      </b-container>
    <b-container class="mb-5" v-if="this.orders.length">
        <b-list-group>
          <b-list-group-item v-for="(order, index) in this.orders" :key="index" class="d-flex flex-row justify-content-between align-items-center">
            <div>
              <h5 class="mb-0">
                <router-link :to="'/admin/order/'+order.id" v-bind:class="{ 'text-success': order.status == 'completed', 'text-primary': order.status == 'processing', 'text-danger': order.status == 'cancelled' }">
                  {{order.title}} 
                  <small>(id: {{order.id}})</small>
                </router-link>
              </h5>
              <order-status :status="order.status"/>
            </div>
            <b-button variant="outline-primary" :to="'/admin/order/'+order.id">Manage</b-button>
          </b-list-group-item>
        </b-list-group>
    </b-container>
    <b-container class="mb-5" v-if="!this.orders.length">
      <b-alert variant="warning" show>You haven't got any orders. Time to get hustling.</b-alert>
    </b-container>
  </div>
</template>

<script>
import OrderStatus from '../../components/OrderStatus';

export default {
  name: 'AdminOrders',
  components: {
    OrderStatus,
  },
  computed: {
    orders() {
      return this.$store.state.admin.orders;
    }
  },
  created () {
    this.$store.dispatch('admin/getOrders');
  },
  mounted() {
  }
};
</script>