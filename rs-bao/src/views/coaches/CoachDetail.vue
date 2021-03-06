<template>
  <div>
    <section>
      <coach-card>
        {{ fetchCoaches.firstName }} {{ fetchCoaches.lastName }}
        <h4>${{ fetchCoaches.hourlyRate }}/{{ $t("hour") }}</h4>
      </coach-card>

      <coach-card>
        <h2>{{ $t("interest") }}</h2>
        <coach-button link :to="linkToContact">
          {{ $t("contact") }}</coach-button
        >
        <!--render ra thằng children mes trong routes-->
        <router-view :key="$route.path"></router-view>
      </coach-card>

      <coach-card>
        <coach-badge
          v-for="area in fetchCoaches.areas"
          :key="area.id"
          :color="area"
          :title="area"
        >
          {{ area }}
        </coach-badge>
        <br />
        {{ this.$route.params.id }}
      </coach-card>
    </section>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "CoachesDetail",
  props: ["id"],
  created() {
    this.$store.dispatch("coaches/fetchCoachesDetail", this.id);
  },
  computed: {
    linkToContact() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    fetchCoaches() {
      return this.$store.state.coaches.coaches;
    },
  },
  beforeRouteLeave() {
    console.log("good bye!");
  }
};
</script>

<style scoped></style>
