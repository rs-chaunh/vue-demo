<template>
  <transition appear name="open">
    <section>
      <item-card>
        <h2> {{$t('registerCoach')}} </h2>
        <item-form-regis></item-form-regis>
      </item-card>
    </section>
  </transition>
</template>

<script>
import ItemCard from "../components/common/ItemCard.vue";
import ItemFormRegis from "../components/RegisterPage/ItemFormRegis.vue";
export default {
  components: { ItemCard, ItemFormRegis },
    beforeRouteLeave() {
    console.log("GOODBYE");
  },
  beforeRouteEnter(to, from) {
    console.log("FROM", from.path);
    console.log("TO", to.path);
  },
};
</script>

<style></style>
