<template>
  <item-lazy-load v-if="$store.state.coach.loading"></item-lazy-load>
  <div>
    <ul v-if="requestedData != ''">
      <li v-for="(item, index) in requestedData" :key="index">
        <div>
          <a :href="`mailto:` + item.userEmail"> {{ item.userEmail }} </a>
        </div>
        <p>{{ item.message }}</p>
      </li>
    </ul>
    <h4 v-else> {{$t('listRequest.received')}} </h4>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(["auth"]),
    requestedData() {
      if (this.auth.request) {
        return Object.values(this.auth.request);
      } else {
        return "";
      }
    },
  },
  created() {
    this.$store.dispatch("auth/getDataRequest");
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
      font-weight: 700;
    }
  }
}
h4 {
  text-align: center;
}
</style>
