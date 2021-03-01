<template>
  <coaches-detail :coach="coachFromFilter ? coachFromFilter : coachFromApi"></coaches-detail>

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
  created() {
    (!this.$store.getters.getCoaches.length > 0) && this.$store.dispatch("getCoachById", this.$route.params.id)
  },
};
</script>