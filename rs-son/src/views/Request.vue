<template>
  <transition name="open" appear>
    <section>
      <item-card>
        <header>
          <h2>{{ $t("listRequest.requestRecevied") }}</h2>
        </header>
        <coach-request></coach-request>
      </item-card>
    </section>
  </transition>
</template>

<script>
import CoachRequest from "../components/Coach/CoachRequest.vue";
export default {
  components: { CoachRequest },
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
header {
  text-align: center;
}
</style>
