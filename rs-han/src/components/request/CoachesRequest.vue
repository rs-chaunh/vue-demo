<template>
  <section>
    <div class="card">
      <header>
        <h2>{{ $t("request.title") }}</h2>
      </header>
      <div v-if="loading">
        <my-loading></my-loading>
      </div>
      <div v-else>
        <h3 v-if="request.length == 0">
          {{ $t("request.message") }}
        </h3>
        <ul v-else v-for="req in request" :key="req">
          <li>
            <a :href="`mailto:${req.email}`">{{ req.email }}</a>
            <p>{{ req.message }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import MyLoading from "../loading/MyLoading";
import { mapState } from "vuex";
export default {
  components: { MyLoading },
  name: "CoachesRequest",
  data() {
    return {
      request: [],
    };
  },
  computed: { ...mapState(["loading"]) },

  created() {
    this.$store.dispatch("requestCoaches", this.request);
  },
  beforeRouteLeave() {
    console.log("good bye!");
  },
};
</script>

<style scoped>
header,
h3 {
  text-align: center;
}

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

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: 700;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
