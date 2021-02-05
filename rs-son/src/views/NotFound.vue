<template>
  <transition name="open" appear>
    <section>
      <item-card>
        <h2>Page not found</h2>
        <p>
          " This page could not be found - maybe check out all our "
          <a href="/coaches">coaches</a>
        </p>
      </item-card>
    </section>
  </transition>
</template>

<script>
import ItemCard from "../components/common/ItemCard.vue";
export default {
  components: { ItemCard },
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
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
