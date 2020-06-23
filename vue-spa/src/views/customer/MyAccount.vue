<template>
  <div>
    <b-container class="mb-5">
      <b-jumbotron header="My Account">
        <h4 v-if="this.total > 0">Total Orders: {{this.total}}</h4>
      </b-jumbotron>
    </b-container>
    <b-container class="mb-5">
      <b-row class="justify-content-center">
        <b-col cols="12">
          <b-list-group class="mb-3 mb-md-4">
            <b-list-group-item  class="d-md-flex flex-row justify-content-between align-items-center">
              <h6 class="mb-1 mb-md-0">Name</h6>
              <h5 class="mb-0">{{currentUser.name}}</h5>
            </b-list-group-item>
            <b-list-group-item  class="d-md-flex flex-row justify-content-between align-items-center">
              <h6 class="mb-1 mb-md-0">User ID:</h6>
              <h5 class="mb-0">{{currentUser.id}}</h5>
            </b-list-group-item>
            <b-list-group-item  class="d-md-flex flex-row justify-content-between align-items-center">
              <h6 class="mb-1 mb-md-0">Email:</h6>
              <h5 class="mb-0">{{currentUser.email}}</h5>
            </b-list-group-item>
          </b-list-group>

          <b-button variant="primary" href @click.prevent="logOut"><font-awesome-icon icon="sign-out-alt" class="mr-1" />LogOut</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Profile',
  created () {
    this.$store.dispatch('user/getOrders');
  },
  computed: {
    ...mapGetters('user', ['totalOrders']),
    currentUser() {
      return this.$store.state.auth.user;
    },
    orders() {
      return this.$store.state.user.orders;
    },
    total () {
      return this.totalOrders;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }

    // this.$store.dispatch('user/getOrders');
  }
};
</script>