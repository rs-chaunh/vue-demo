<template>
  <div id="page-not-found">
    <h2>Page not found</h2>
    <p>
      This page could not be found - maybe check out all our
      <router-link to="/"> coaches. </router-link>
    </p>
  </div>
</template>
<script>
export default {
  name: "PageNotFound",
};
</script>

<style scoped>
#page-not-found {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
  line-height: 30px;
}
</style>
