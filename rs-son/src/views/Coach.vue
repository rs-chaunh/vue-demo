<template>
  <transition appear name="open">
    <div class="home">
      <coach-filter @handleGetItemList="handleGetItemList" />
      <router-view></router-view>
      <coach-list :itemFilter="itemFilter" />
    </div>
  </transition>
</template>

<script>
import CoachFilter from "../components/Coach/CoachFilter.vue";
import CoachList from "../components/Coach/CoachList.vue";

export default {
  components: {
    CoachList,
    CoachFilter,
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
<style scoped></style>
