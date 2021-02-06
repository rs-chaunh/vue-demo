<template>
  <div>
    <coach-card>
      <h2>Requests Received</h2>
        <coach-loading v-if="loading"></coach-loading>
      <div
        class="list-message"
        v-else-if="requests && requests.length > 0 && !loading"
      >
        <div class="box" v-for="request in requests" :key="request.id">
          <a :href="mailTo(request.userEmail)"
            >Email: {{ request.userEmail }}</a
          >
          <h4>Message: {{ request.userMessage }}</h4>
        </div>
      </div>
      <h3 v-else>You haven't received any requests yet!</h3>
    </coach-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CoachLoading from "../../components/common/CoachLoading.vue";
export default {
  components: { CoachLoading },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.fetchRequest();
  },
  computed: {
    ...mapState("requests", ["requests"]),
  },
  methods: {
    mailTo(user) {
      return "mailto:" + user;
    },
    async fetchRequest() {
      this.loading = true;
      try {
        await this.$store.dispatch("requests/fetchRequest");
      } catch (err) {
        this.error = "Request failed!";
      }
      this.loading = false;
    },
  },
};
</script>
<style scoped>
h2,
h3 {
  text-align: center;
}

.list-message {
  text-align: left;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

.box {
  padding: 10px;
  border: 1px solid rgb(209, 206, 206);
  margin: 15px 0;
}
</style>
