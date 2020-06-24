<template>
  <div v-if="this.order">
    <b-container>
      <b-row>
        <b-col cols="12">
          <h1 class="mb-0">{{order.title}} <small class="h6">({{order.created_at}})</small></h1>
          
          <div class="d-flex flex-row justify-content-between align-items-end">
            <h4 class="mb-1 mb-md-0">Order: #{{order.id}}</h4>
            <order-status-select :status="this.order.status" v-on:updateStatus="newStatus" />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <hr class="my-3 my-md-5" />
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row class="mb-3">
        <b-col cols="12" md="8">
          <div v-if="this.user" class="mb-4">
            <h6>Name: <strong>{{this.user.name}}</strong></h6>
            <h6>Email: <strong>{{this.user.email}}</strong></h6>
          </div>
          <h6>Description:</h6>
          <p>{{this.order.description}}</p>
          <div v-if="this.order.status == 'processing'" class="mt-4">
              <b-button @click.prevent="cancelOrder" variant="danger">Cancel Order</b-button>
          </div>
        </b-col>
        <b-col cols="12" md="4">
          <h6>Notes: </h6>
            <div class="mb-4">
              <b-form @submit.prevent="handleSubmit" id="newOrder">
                <b-form-group >
                  <b-form-textarea name="newNote" v-model="newNote" placeholder="Add a note for the customer" rows="3" max-rows="6" v-validate="'required|max:75'" :disabled="loading"></b-form-textarea>
                  <span>{{ errors.first('newNote') }}</span>
                </b-form-group>

                <b-button type="submit" variant="primary" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  Add Note
                </b-button>
              </b-form>
            </div>

            <b-alert v-for="(note, index) in this.order.notes" :key="index" variant="info" class="mb-3" show>
              <h6 class="mb-0"><small>{{note.date}}</small></h6>
              <p class="mb-0 text-break">{{note.message}}</p>
            </b-alert>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OrderStatusSelect from '../../components/OrderStatusSelect';

export default {
  name: 'AdminEditOrder',
  components: {
    OrderStatusSelect,
  },
  data () {
    return {
      newNote: '',
      loading: false,
    }
  },
  created () {
    this.$store.dispatch('admin/getOrders', this.$route.params.id);
    this.$store.dispatch('admin/getCustomer', this.$route.params.id)
  },
  computed: {
    ...mapGetters('admin', ['getOrder','getOrderIndex']),
    order () {
      return this.getOrder(this.$route.params.id);
    },
    index () {
      return this.getOrderIndex(this.$route.params.id);
    },
    user () {
      return this.$store.state.admin.orderUser;
    }
  },
  methods: {
    cancelOrder() {
      this.$store.dispatch('admin/deleteOrder', this.$route.params.id).then(() => {
        return this.$router.push('/admin');
      });
    },
    newStatus(status) {
      this.$store.dispatch('admin/updateStatus', { index: this.index, id: this.$route.params.id, status: status });
    },
    handleSubmit () {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (isValid) {
            let date = new Date();
            date = date.getHours() + ":" + date.getMinutes() + " / " + date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()

            
            this.$store.dispatch('admin/addNote', {index: this.index, id: this.$route.params.id, date: date, message: this.newNote}).then(
              () => {
                this.loading = false;
                this.newNote = '';
                this.$nextTick(() => {
                    this.errors.clear();
                    this.$nextTick(() => {
                        this.$validator.reset();
                    });
                });
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
  },
  mounted() {
  }
};
</script>