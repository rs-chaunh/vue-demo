<template>
  <transition name="open" appear>
    <section>
      <item-card>
        <h2>{{ $t("notFound.notFound") }}</h2>
        <p>
          " {{ $t("notFound.notFoundContent") }} "
          <router-link to="/coaches">
            {{ $t("coaches.coaches") }}
          </router-link>
        </p>
      </item-card>
    </section>
  </transition>
</template>

<script>
export default {
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
