<template>
  <div>
    <b-container class="mb-5">
      <b-jumbotron header="My Orders">
        <p>Hey {{this.currentUser.name}}, you can keep track of your orders and their status below.</p>
      </b-jumbotron>
    </b-container>
    <b-container class="mb-5" v-if="this.orders.length">
        <b-list-group>
          <b-list-group-item v-for="order in this.orders" :key="order.id" class="d-flex flex-row justify-content-between align-items-center">
            <div>
              <h5 class="mb-0">
                <router-link :to="'/my-orders/'+order.id" v-bind:class="{ 'text-success': order.status == 'completed', 'text-primary': order.status == 'processing', 'text-danger': order.status == 'cancelled' }">
                  {{order.title}} 
                  <small>(id: {{order.id}})</small>
                </router-link>
              </h5>
              <order-status :status="order.status"/>
            </div>
            <b-button variant="outline-primary" :to="'/my-orders/'+order.id">View</b-button>
          </b-list-group-item>
        </b-list-group>
    </b-container>
    <b-container class="mb-5" v-if="!this.orders.length">
      <b-alert variant="warning" show>It looks like you haven't placed any orders yet. What're you waiting for? </b-alert>
      <b-button variant="primary" :to="'/new-order'">Place an Order</b-button>
    </b-container>
  </div>
</template>

<script>
import OrderStatus from '../../components/OrderStatus';

export default {
  name: 'CustomerOrders',
  data (){
    return { 
      total: 0
    }
  },
  components: {
    OrderStatus,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    orders() {
      return this.$store.state.user.orders;
    }
  },
  created () {
    if (this.currentUser.role !== 2) {
      this.$store.dispatch('user/getOrders');
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    
    if (this.currentUser.role === 2) {
      this.$router.push('/admin');
    }
  }
};
</script>