<template>
  <router-link :to="linkTo">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ["linkTo"],
};
</script>

<style scoped laang="scss">
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: #fff;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}
a.outline {
  outline: none;
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}
a:hover {
  background-color: #270041;
  border-color: #270041;
}
.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}
.outline:hover {
  background-color: #edd2ff;
}
</style>
