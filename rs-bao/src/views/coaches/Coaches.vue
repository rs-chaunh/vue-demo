<template>
  <div>
    <section>
      <coach-filter @changeFilter="onChangeFilter"></coach-filter>
    </section>
    <section>
      <coach-card>
        <div class="list-button">
          <coach-button @click="fetchCoaches" background="light">
            Refresh
          </coach-button>

          <coach-button
            link
            v-if="!isLogin"
            :path="'/auth'"
            :query="'register'"
          >
            Login to Register as Coach
          </coach-button>

          <coach-button
            v-if="isLogin && !isCoach && !loading"
            link
            :path="'/register'"
          >
            Register as Coach
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
          <h3>No coaches found.</h3>
        </div>
      </coach-card>
    </section>
  </div>
</template>

<script>
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import CoachItem from "../../components/coaches/CoachItem.vue";

export default {
  components: { CoachFilter, CoachItem },
  data() {
    return {
      loading: false,
      coachesFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
      error: null,
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },

    isCoach() {
      return this.$store.getters["auth/isCoach"];
    },

    hasCoaches() {
      return !this.loading && this.$store.getters["coaches/hasCoaches"];
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/allCoaches"];
      return coaches.filter((coach) => {
        //check phần tử có tồn tại trong mảng ko
        if (this.coachesFilter.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.coachesFilter.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.coachesFilter.career && coach.areas.includes("career")) {
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
      this.coachesFilter = data;
    },
    async fetchCoaches() {
      this.loading = true;
      try {
        await this.$store.dispatch("coaches/fetchCoaches").then(() => {
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
      } catch (err) {
        this.error = "Failed to fetch!";
      }
    },
  },
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
