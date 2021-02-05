<template>
  <requests
    :listRequest="getRequestsByUserId ? getRequestsByUserId.listRequest : []"
  ></requests>
</template>

<script>
import Requests from '../views/Requests/Requests.vue'
export default {
  components: { Requests },
  computed: {
    getRequestsByUserId() {
      return this.$store.getters.filterRequestsByUserId(localStorage.getItem("userId"))
    }
  },
  created() {
    this.$store.dispatch("getAllRequests")
  }
}
</script>

<style>

</style>