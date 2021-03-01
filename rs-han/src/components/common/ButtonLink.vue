<template>
  <router-link
    :to="{
      name: namePage,
      query: { redirect: queryPage },
      params: { id: userId },
    }"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "ButtonLink",
  props: ["name", "query", "id"],
  data() {
    return {
      namePage: this.name,
      queryPage: this.query,
      userId: this.id,
    };
  },
};
</script>

<style scoped>
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
</style>
