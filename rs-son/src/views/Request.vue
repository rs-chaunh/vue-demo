<template>
  <transition name="open" appear>
    <section>
      <item-card>
        <header>
          <h2>{{$t('requestRecevied')}}</h2>
        </header>
        <list-request></list-request>
      </item-card>
    </section>
  </transition>
</template>

<script>
import ItemCard from "../components/Common/ItemCard";
import ListRequest from "../components/Request/ListRequest.vue";
export default {
  components: { ItemCard, ListRequest },
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
