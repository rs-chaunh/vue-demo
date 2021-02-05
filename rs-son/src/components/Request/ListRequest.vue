<template>
  <item-lazy-load v-if="$store.state.loading"></item-lazy-load>
  <div>
    <ul v-if="getDataRequest != ''">
      <li v-for="(item, index) in getDataRequest" :key="index">
        <div>
          <a :href="`mailto:` + item.userEmail"> {{ item.userEmail }} </a>
        </div>
        <p>{{ item.message }}</p>
      </li>
    </ul>
    <h4 v-else>You haven't received any requests yet!</h4>
  </div>
</template>

<script>
import itemLazyLoad from "../common/itemLazyLoad.vue";
export default {
  components: { itemLazyLoad },
  computed: {
    getDataRequest() {
      if (this.$store.state.request) {
        return Object.values(this.$store.state.request);
      } else {
        return "";
      }
    },
  },
  created() {
    this.$store.commit("SET_LOADING", true);
    this.$store.dispatch("getDataRequest");
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
  li {
    margin: 1rem 0;
    border: 1px solid #ccc;
    padding: 1rem;
    p {
      margin: 0.5rem 0 0 0;
    }
    a {
      color: #3d008d;
      text-decoration: none;
      font-weight: 700;
    }
  }
}
h4 {
  text-align: center;
}
</style>
