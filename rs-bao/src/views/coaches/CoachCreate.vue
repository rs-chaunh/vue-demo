//TODO đặt tên file là CoachRegister thì hợp lí hơn
<template>
  <div id="coach-create">
    <coach-card>
      <h2>{{$t('registerACoach')}}</h2>
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
      //TODO tại sao lại dùng router replace
      //TODO nên redirect theo name của URL, url path sau này có thể bị thay đổi
    },
  },
};
</script>
<style scoped>
#coach-create {
  text-align: center;
}
</style>
