<template>
  <div>
    <section>
      <coach-card>
        {{ detail.firstName }} {{ detail.lastName }}
        <h4>${{ detail.hourlyRate }}/{{ $t("hour") }}</h4>
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
          v-for="area in detail.areas"
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
import axios from "axios";
export default {
  name: "CoachesDetail",
  props: ["id"],
  data() {
    return {
      detail: [],
    };
  },
  created() {
    //TODO sao k dùng action, giữ cho component càng đơn giản càng tốt
    axios
      .get(
        `https://coaches-e0de4-default-rtdb.firebaseio.com/coaches/${this.id}.json`
      )
      .then((response) => {
        this.detail = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    // this.$store.dispatch("coaches/fetchCoachesDetail", this.id);
  },
  computed: {
    linkToContact() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    // detail() {
    //   return this.$store.getters["coaches/allCoaches"];
    // },
  },
};
</script>

<style scoped></style>
