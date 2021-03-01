<template>
  <div>
    <section>
      <div class="card">
        <h2>{{ fullname }}</h2>
        <h3>${{ coach && coach.hourlyRate }}/hour</h3>
      </div>
    </section>

    <section>
      <div class="card">
        <header>
          <h2>Interested? Reach out now!</h2>
          <custom-button
            type="purple"
            :href="{ name: 'CoachesDetailContact', params: { id: $route.params.id }}"
            >Contact</custom-button
          >
        </header>

        <router-view></router-view>
      </div>
    </section>

    <section>
      <div class="card" v-if="coach">
        <div class="badge" :class="area"
          v-for="(area, index) of coach.areas"
          :area="area"
          :key="index"
        >{{ area }}</div>
        <p>{{ coach.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CustomButton from "../commons/CustomButton";

export default {
  props: {
    coach: {
      type: Object,
      require: true,
    },
  },
  components: {
    CustomButton,
  },
  computed: {
    fullname() {
      return this.coach ? this.coach.firstName + " " + this.coach.lastName : "";
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;

  .actions {
    justify-content: center;
  }
}
</style>