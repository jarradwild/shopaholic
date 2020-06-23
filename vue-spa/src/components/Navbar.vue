<template>
    <b-navbar toggleable="lg" type="dark" variant="info" class="mb-5">
      <b-navbar-brand :to="this.homeLink">Shopaholic</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :active="$route.matched.some(({ name }) => name === 'my-orders')" to="/my-orders" v-if="currentUser && !showAdminDashboard">My Orders</b-nav-item>
          <b-nav-item :active="$route.matched.some(({ name }) => name === 'new-order')" to="/new-order" v-if="currentUser && !showAdminDashboard">New Order</b-nav-item>
          <b-nav-item :active="$route.matched.some(({ name }) => name === 'admin')" to="/admin" v-if="showAdminDashboard">Manage Orders</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="!currentUser" class="ml-auto">
          <b-nav-item :active="$route.matched.some(({ name }) => name === 'register')"  to="/register">Register</b-nav-item>
          <b-nav-item :active="$route.matched.some(({ name }) => name === 'login')"  to="/login">Login</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="currentUser" class="ml-auto">
          <b-nav-item :active="$route.matched.some(({ name }) => name === 'my-account')" to="/my-account">My Account</b-nav-item>
          <b-nav-item href @click.prevent="logOut">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminDashboard() {
      if (this.currentUser && this.currentUser.role === 2) {
        return true;
      }

      return false;
    },
    homeLink() {
      if(this.currentUser && this.currentUser.role == 2){
        return '/admin'
      } else if (this.currentUser) {
        return '/my-orders'
      } else {
        return '/login'
      }
    }
  },
  created() {
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>
