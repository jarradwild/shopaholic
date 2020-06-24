<template>
  <div v-if="this.order">

    <b-container>
      <b-row>
        <b-col cols="12">
          <h1>{{order.title}} <small class="h6">({{order.created_at}})</small></h1>
          
          <div class="d-md-flex flex-row justify-content-between align-items-end">
            <h4 class="mb-1 mb-md-0">Order: #{{order.id}}</h4>
            <order-status :status="this.order.status"/>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <hr class="my-3 my-md-5" />
        </b-col>
      </b-row>
    </b-container>

    <b-container class="mb-5">
      <b-row class="mb-3">
        <b-col cols="12" md="8">
          <h6>Description:</h6>
          <p class="text-break">{{this.order.description}}</p>
        </b-col>
        <b-col cols="12" md="4">
          <h6>Notes: </h6>
          <b-alert v-for="(note, index) in this.order.notes" :key="index" variant="info" class="mb-3" show>   
            <h6 class="mb-0"><small>{{note.date}}</small></h6>
            <p class="mb-0 text-break">{{note.message}}</p>
          </b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-5">
        <b-col cols="12">
          <b-button variant="primary" to="/new-order">
            New Order
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OrderStatus from '../../components/OrderStatus';

export default {
  name: 'ViewOrder',
  components: {
    OrderStatus,
  },
  created () {
    this.$store.dispatch('user/getOrders');
  },
  computed: {
    ...mapGetters('user', ['getOrder']),
    currentUser() {
      return this.$store.state.auth.user;
    },
    order () {
      return this.getOrder(this.$route.params.id);
    }
  },
  mounted() {
    // console.log(this.$store.state.auth.user.role);
  }
};
</script>