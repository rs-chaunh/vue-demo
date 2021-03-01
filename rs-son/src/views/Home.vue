<template>
  <transition appear name="open">
    <div class="home">
      <Filter @handleGetItemList="handleGetItemList" />
      <router-view></router-view>
      <list-coach :itemFilter="itemFilter" />
    </div>
  </transition>
</template>

<script>
import Filter from "../components/HomePage/Filter.vue";
import ListCoach from "../components/HomePage/ListCoach.vue";

export default {
  name: "Home",
  components: {
    ListCoach,
    Filter,
  },
  data() {
    return {
      itemFilter: "",
    };
  },
  methods: {
    handleGetItemList(list) {
      this.itemFilter = list;
    },
    resetPage() {
      window.location.reload();
    },
  },
    beforeRouteLeave() {
    console.log("GOODBYE");
  },
  beforeRouteEnter(to, from) {
    console.log("FROM", from.path);
    console.log("TO", to.path);
  },
};
</script>
<style scoped>

</style>
