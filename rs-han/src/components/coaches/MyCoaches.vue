//TODO file này nên để trong folder views, vì nó là 1 page, chứ không còn là component nhỏ nữa, nên đặt tên là CoachesPage
<template>
  <section>
    <find-coaches />
    <find-coaches-list />
  </section>
</template>

<script>
import FindCoaches from "./FindCoaches";
import FindCoachesList from "./FindCoachesList";
export default {
  components: { FindCoaches, FindCoachesList },
  created() {
    this.$store.dispatch("getCoaches");
    this.$store.dispatch("getUserRegister");
  },
  beforeRouteLeave() {
    console.log("good bye!");
  },
};
</script>

<style></style>
