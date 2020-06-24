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
            <h5 class="mb-4">Create A New Account</h5>
            <b-form name="form" @submit.prevent="handleRegister" class="text-left">
              <b-form-group label="Name:" label-for="name" >
                <b-form-input v-model="user.name" name="name" type="text" placeholder="John Doe" v-validate="'required'"></b-form-input>

                <b-alert variant="danger" class="mt-2" v-if="errors.has('name')" show>
                  Name is required!
                </b-alert>
              </b-form-group>

              <b-form-group label="Email Address:" label-for="email" >
                <b-form-input v-model="user.email" name="email" type="email" placeholder="john@doe.com" v-validate="'required'"></b-form-input>

                <b-alert variant="danger" class="mt-2" v-if="errors.has('email')" show>
                  Email Address is required!
                </b-alert>
              </b-form-group>

              <b-form-group label="Password:" label-for="password" >
                <b-form-input v-model="user.password" name="password" type="password" v-validate="'required'"></b-form-input>
                 <b-alert variant="danger" class="mt-2" v-if="errors.has('password')" show>
                  Password is required!
                </b-alert>
              </b-form-group>

              <b-form-group label="Confirm Password:" label-for="password_confirmation" >
                <b-form-input v-model="user.password_confirmation" name="password_confirmation" type="password" v-validate="'required'"></b-form-input>
                 <b-alert variant="danger" class="mt-2" v-if="errors.has('password')" show>
                  Password Confirmation is required!
                </b-alert>
              </b-form-group>


              <b-button variant="primary" :block="true" type="submit" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>Sign Up</span>
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
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
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
    handleRegister() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/register', this.user).then(
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