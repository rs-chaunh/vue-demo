<template>
  <div>
    <section>
      <coach-filter @changeFilter="onChangeFilter"></coach-filter>
    </section>
    <section>
      <coach-card>
        <div class="list-button">
          <coach-button @click="fetchCoaches" background="light">
            {{ $t("refresh") }}
          </coach-button>

          <coach-button link v-if="!isAuth" :path="'/auth'" :query="'register'">
            {{ $t("loginToRegister") }}
          </coach-button>

          <coach-button
            v-if="isAuth && !isCoach && !loading"
            link
            :path="'/register'"
          >
            {{ $t("registerCoach") }}
          </coach-button>
        </div>
        <div v-if="loading">
          <coach-loading></coach-loading>
        </div>
        <div
          class="list-coaches"
          v-else-if="!loading && filteredCoaches && filteredCoaches.length > 0"
        >
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :hourlyRate="coach.hourlyRate"
            :areas="coach.areas"
          >
          </coach-item>
        </div>
        <div v-else>
          <h3>{{ $t("notFoundCoach") }}</h3>
        </div>
      </coach-card>
    </section>
  </div>
</template>

<script>
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import CoachItem from "../../components/coaches/CoachItem.vue";
// import mapGetters from "vuex";

export default {
  components: { CoachFilter, CoachItem },
  data() {
    return {
      loading: false,
      coachFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      error: null,
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },

    isCoach() {
      return this.$store.getters["auth/isCoach"];
    },
    // ...mapGetters("auth", ["isAuth", "isCoach"]),
    hasCoaches() {
      return !this.loading && this.$store.getters["coaches/hasCoaches"];
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/allCoaches"];
      return coaches.filter((coach) => {
        if (
          (this.coachFilters.frontend && coach.areas.includes("frontend")) ||
          (this.coachFilters.backend && coach.areas.includes("backend")) ||
          (this.coachFilters.career && coach.areas.includes("career"))
        ) {
          return true;
        }
        return false;
      });
    },
  },
  created() {
    this.fetchCoaches();
  },
  methods: {
    onChangeFilter(data) {
      this.coachFilters = data;
    },
    async fetchCoaches() {
      this.loading = true;
      try {
        await this.$store.dispatch("coaches/fetchCoaches");
        this.loading = false;
      } catch (err) {
        this.error = this.$t("failToFetch");
        this.loading = false;
      }
    },
  },
  beforeRouteLeave() {
    console.log("good bye!");
  }
};
</script>

<style scoped>
.list-button {
  display: flex;
  justify-content: space-between;
}
h3 {
  text-align: center;
}
</style>
