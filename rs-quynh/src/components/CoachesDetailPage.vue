<template>
  <coaches-detail :coach="coach"></coaches-detail>
</template>

<script>
import CoachesDetail from "../views/Coaches/CoachesDetail.vue";

export default {
  components: { CoachesDetail },
  computed: {
    coach() {
      return this.$store.getters.getCoachById(this.$route.params.id);
    }
  },
  created() {
    this.$store.dispatch("getAllCoaches")
  },
};
</script>

<style>
</style>