<template>
  <b-container class="mb-5">
    <b-row class="justify-content-center">
      <b-col cols="12" md="6" lg="5">
        <b-card class="text-center">
          <img
              id="profile-img"
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              class="profile-img-card mb-3 rounded-circle"
            />
            <h5 class="mb-4">Login To Your Account</h5>
            <b-form name="form" @submit.prevent="handleLogin" class="text-left">

              <b-form-group label="Email Address:" label-for="email" >
                <b-form-input v-model="user.email" name="email" type="email" placeholder="john@doe.com" v-validate="'required'"></b-form-input>
                <span class="text-danger" v-if="errors.has('email')"><small>Email Address is required!</small></span>
              </b-form-group>

              <b-form-group label="Password:" label-for="password" >
                <b-form-input v-model="user.password" name="password" type="password" v-validate="'required'"></b-form-input>
                <span class="text-danger" v-if="errors.has('password')"><small>Password is required!</small></span>
              </b-form-group>

              <b-button variant="primary" :block="true" type="submit" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>Login</span>
              </b-button>

              <b-alert variant="danger" class="mt-3" v-if="message" show>
                {{message}}
              </b-alert>
            </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/my-orders');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/my-orders');
            },
            error => {
              this.loading = false;
              this.message = error;
            }
          );
        }
      });
    }
  }
};
</script>