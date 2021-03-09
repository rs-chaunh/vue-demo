<template>
  <section>
    <section>
      <div class="card">
        <h2>{{ fullName }}</h2>
        <h3>{{ infoCoaches.hourlyRate }}$/{{ $t("common.text.hour") }}</h3>
      </div>
    </section>
    <section>
      <div class="card">
        <header>
          <h2>{{ $t("contact.title") }}</h2>
          <button-link :name="'ContactCoach'">{{
            $t("common.button.contact")
          }}</button-link>
          <coaches-contact-form :id="infoCoaches.id" />
        </header>
      </div>
    </section>
    <section>
      <div class="card">
        <my-badge v-for="area in infoCoaches.areas" :key="area" :area="area">
          {{ area.toUpperCase() }}</my-badge
        >
        <p>{{ infoCoaches.description }}</p>
      </div>
    </section>
  </section>
</template>

<script>
import CoachesContactForm from "../components/coaches/CoachesContactForm.vue";
export default {
  name: "ContactCoach",
  components: { CoachesContactForm },
  computed: {
    infoCoaches() {
      return this.$store.state.coaches.infoCoaches;
    },
    fullName() {
      return this.infoCoaches.firstName + " " + this.infoCoaches.lastName;
    },
  },
  created() {
    this.$store.dispatch("coaches/infoCoaches", this.$route.params.id);
  },
  beforeRouteLeave() {
    console.log("good bye!");
  },
};
</script>

<style scoped>
h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

h3 {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
