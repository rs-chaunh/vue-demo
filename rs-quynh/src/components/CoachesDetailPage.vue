<template>
  <coaches-detail 
    :coach="coachFromFilter ? coachFromFilter : coachFromApi"
    :handlerCloseModal="handlerCloseModal"
  ></coaches-detail>

</template>

<script>
import CoachesDetail from "../views/Coaches/CoachesDetail.vue";

export default {
  components: { CoachesDetail },
  computed: {
    coachFromFilter() {
      return this.$store.getters.getCoachById(this.$route.params.id);
    },
    coachFromApi() {
      return this.$store.getters.getCoachDetail;
    }
  },
  methods: {
    handlerCloseModal() {
      this.$store.commit("SET_IS_ERROR", false);
    },
  },
  created() {
    (!this.$store.getters.getCoaches.length > 0) && this.$store.dispatch("getCoachById", this.$route.params.id)
  },
};
</script>