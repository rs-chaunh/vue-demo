<template>
  <coaches-detail-contact
    :sendNewRequest="sendNewRequest"
    :error="error"
  ></coaches-detail-contact>
</template>

<script>
import CoachesDetailContact from "../views/Coaches/CoachesDetailContact.vue";
export default {
  components: { CoachesDetailContact },
  data() {
    return {
      error: false,
    };
  },
  methods: {
    sendNewRequest(email, message) {
      if (email === "" || message === "") this.error = true;
      else this.error = false;
      if (!this.error) {
        const coach = this.$store.getters.getCoachById(this.$route.params.id);
        this.$store.dispatch("sendNewRequest", {
          listRequest: { email: email, message: message },
          userId: coach ? coach.userId : "",
        });
      }
    },
  },
  created() {
    this.$store.dispatch("getAllCoaches");
    this.$store.dispatch("getAllRequests");
  },
};
</script>

<style>
</style>