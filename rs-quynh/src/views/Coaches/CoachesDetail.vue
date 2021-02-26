<template>
  <div>
    <section>
      <card>
        <h2>{{ fullname }}</h2>
        <h3>${{ coach.hourlyRate }}/hour</h3>
      </card>
    </section>

    <section>
      <card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <custom-button
            type="purple"
            :href="`/coaches/${$route.params.id}/contact`"
            >Contact</custom-button
          >
        </header>

        <router-view></router-view>
      </card>
    </section>

    <section>
      <card>
        <badge
          v-for="(area, index) of coach.areas"
          :area="area"
          :key="index"
        ></badge>
        <p>{{ coach.description }}</p>
      </card>
    </section>
  </div>
</template>

<script>
import Card from "../commons/Card.vue";
import CustomButton from "../commons/CustomButton.vue";
import Badge from "../commons/Badge.vue";

export default {
  props: {
    coach: {
      type: Object,
      require: true,
    },
  },
  components: {
    Card,
    CustomButton,
    Badge,
  },
  computed: {
    fullname() {
      return this.coach.firstName + " " + this.coach.lastName;
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