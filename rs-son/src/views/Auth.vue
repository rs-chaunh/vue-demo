<template>
  <transition name="open" appear>
    <item-card>
      <item-form-auth></item-form-auth>
    </item-card>
  </transition>
</template>

<script>
import ItemFormAuth from "../components/Auth/ItemFormAuth.vue";
export default {
  components: { ItemFormAuth },
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
