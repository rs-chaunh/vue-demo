<template>
  <div class="card">
    <h2>Register as a coach now!</h2>
    <coaches-register-form />
  </div>
</template>

<script>
import CoachesRegisterForm from "./CoachesRegisterForm";
export default {
  name: "CoachesRegister",
  components: { CoachesRegisterForm },
  beforeRouteLeave() {
    console.log("good bye!");
  },
  created() {
    this.$store.dispatch("getUserRegister");
  },
};
</script>

<style scoped>
h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
</style>
