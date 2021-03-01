<template>
  <transition name="open" appear>
    <item-card>
      <item-form-auth></item-form-auth>
    </item-card>
  </transition>
</template>

<script>
import ItemCard from "../components/common/ItemCard.vue";
import ItemFormAuth from "../components/AuthPage/ItemFormAuth.vue";
export default {
  components: { ItemCard, ItemFormAuth },
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
