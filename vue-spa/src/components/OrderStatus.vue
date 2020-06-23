<template>
  <b-badge :variant="this.currentStatus">{{this.status}}</b-badge>
</template>

<script>
export default {
  name: 'OrderStatus',
  props: {
    status: String
  },
  computed: {
    currentStatus () {
      if(this.status == 'completed'){
        return 'success';
      } else if(this.status == 'cancelled'){
        return 'danger';
      } else {
        return 'primary';
      }
    },
  }
}
</script>
