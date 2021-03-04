<template>
  <coaches-detail-contact
    :sendNewRequest="sendNewRequest"
    :error="error"
    :handlerCloseModal="handlerCloseModal"
  ></coaches-detail-contact>
</template>

<script>
import shortid from "shortid";
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
          listRequest: {
            email: email,
            message: message,
            isSendNotification: false,
            id: shortid.generate(),
          },
          userId: coach ? coach.userId : "",
        });
      }
    },
    handlerCloseModal() {
      this.$store.commit("SET_IS_ERROR", false);
    },
  },
  created() {
    this.$store.dispatch("getAllCoaches");
    this.$store.dispatch("getAllRequests");
  },
};
</script>