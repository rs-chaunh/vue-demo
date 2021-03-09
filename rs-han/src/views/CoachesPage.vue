<template>
  <section>
    <coaches-filters />
    <coaches-list />
  </section>
</template>

<script>
import CoachesFilters from "../components/coaches/CoachesFilters";
import CoachesList from "../components/coaches/CoachesList";
export default {
  name: "CoachesPage",
  components: { CoachesFilters, CoachesList },
  created() {
    this.$store.dispatch("coaches/getCoaches");
    this.$store.dispatch("coaches/getUserRegister");
  },
  beforeRouteLeave() {
    console.log("good bye!");
  },
};
</script>

<style></style>
