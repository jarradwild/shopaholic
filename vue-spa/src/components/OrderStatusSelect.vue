<template>
    <div>
      <b-dropdown id="orderStatusDropdown" :text="this.status" :variant="currentStatus()">
        <b-dropdown-item variant="primary" @click.prevent="emitStatus('processing')">Processing</b-dropdown-item>
        <b-dropdown-item variant="success" @click.prevent="emitStatus('completed')">Completed</b-dropdown-item>
        <b-dropdown-item variant="danger" @click.prevent="emitStatus('cancelled')">Cancelled</b-dropdown-item>
      </b-dropdown>
    </div>
</template>

<script>
export default {
  name: 'OrderStatusSelect',
  data () {
    return {
      currentColor: 'primary',
    }
  },
  props: {
    status: String
  },
  methods: {
    currentStatus () {
      if(this.status == 'completed'){
        return 'success';
      } else if(this.status == 'cancelled'){
        return 'danger';
      } else {
        return 'primary';
      }
    },
    emitStatus (status) {
      this.$emit('updateStatus', status);
    }
  }
}
</script>
