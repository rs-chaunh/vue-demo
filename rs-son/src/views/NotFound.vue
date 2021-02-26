<template>
  <transition name="open" appear>
    <section>
      <item-card>
        <h2>{{ $t("notFound") }}</h2>
        <p>
          " {{ $t("notFoundContent") }} "
          <router-link to="/coaches">
            {{ $t("coaches") }}
          </router-link>
        </p>
      </item-card>
    </section>
  </transition>
</template>

<script>
import ItemCard from "../components/Common/ItemCard";
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
