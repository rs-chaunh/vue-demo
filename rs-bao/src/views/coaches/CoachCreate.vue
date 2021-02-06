<template>
  <div id="coach-create">
    <coach-card>
      <h2>Register a Coach</h2>
      <coach-create-form @register-coach="registerCoach"></coach-create-form>
    </coach-card>
  </div>
</template>
<script>
import CoachCreateForm from "../../components/coaches/CoachCreateForm.vue";
import CoachCard from "../../components/common/CoachCard.vue";
export default {
  components: { CoachCard, CoachCreateForm },
  methods: {
    registerCoach(data) {
      this.$store.dispatch("coaches/registerCoach", data);
      this.$router.replace("/coaches");
    },
  },
};
</script>
<style scoped>
#coach-create {
  text-align: center;
}
</style>
