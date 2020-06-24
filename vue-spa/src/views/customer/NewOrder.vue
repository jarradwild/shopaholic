<template>
  <div>
    <b-container class="mb-5">
      <b-jumbotron header="New Order">
        <p>Fill out your order details below and one of our friendly staff will get back to you as soon as possible.</p>
      </b-jumbotron>
    </b-container>
    <b-container class="mb-5">
      <b-form @submit.prevent="handleSubmit" v-if="!submitted">
      
        <b-form-row class="justify-content-center">
          <b-col cols="12" md="8" lg="7">
            <b-form-group label="Title:" label-for="title" >
              <b-form-input v-model="newOrder.title" placeholder="Enter a title for the order" v-validate="'required'" name="title"></b-form-input>
              <span class="text-danger"><small>{{ errors.first('title') }}</small></span>
            </b-form-group>

            <b-form-group label="Description:" label-for="description" >
              <b-form-textarea name="description" v-model="newOrder.description" placeholder="What would you like to order?" rows="3" max-rows="6" v-validate="'required|max:75'"></b-form-textarea>
              <span class="text-danger"><small>{{ errors.first('description') }}</small></span>
            </b-form-group>
            
            <b-button variant="primary" type="submit" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span> 
              Submit Order
            </b-button>
          </b-col>
        </b-form-row>
      </b-form>

      <b-row class="justify-content-center" v-if="submitted && !loading">
        <b-col cols="12" md="8" lg="7">
          <b-alert variant="success" show>
            <h3>Order Successfully Submitted.</h3>
            <p>Your order has been submitted and will be reviewed by one of our staff. You can <router-link v-if="this.recentOrder" :to="'/my-orders/'+this.recentOrder">check in on your order</router-link> status at anytime.</p>
          </b-alert>
          <b-button variant="primary" @click.prevent="clearForm">
              New Order
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NewOrder from '../../models/newOrder';

export default {
  name: 'NewOrder',
  data () { 
    return {
      newOrder: new NewOrder('',''),
      loading: false,
      submitted: false,
      recentOrder: null,
    }
  },
  methods: {
    handleSubmit (evt) {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (isValid) {
            let date = new Date();
            date = date.getHours() + ":" + date.getMinutes() + " / " + date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()
            this.newOrder.status = 'processing';
            this.newOrder.notes = [{date: date, message: 'Order Submitted.'}];
            this.$store.dispatch('user/addNewOrder', this.newOrder).then(
              (response) => {
                this.loading = false;
                this.submitted = true;
                this.recentOrder = response.data.order.id;
              },
              error => {
                this.loading = false;
                this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              }
            );
          }
      })
    },
    clearForm () {
      this.loading = false;
      this.submitted = false;
      this.newOrder = {};
      this.recentOrder = null;
    }
  }
};
</script>