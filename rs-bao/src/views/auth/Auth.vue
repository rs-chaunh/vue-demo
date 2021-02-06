<template>
  <div class="login-page">
    <coach-login-form></coach-login-form>
  </div>
</template>
<script>
import CoachLoginForm from "../../components/coaches/CoachLoginForm.vue";

export default {
  name: "Login",
  components: {
    CoachLoginForm,
  },
};
</script>
<style scoped>
.login-page {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
