<template>
  <div id="footer">
    <div class="container">
      <h1>Footer</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader",
};
</script>

<style scoped>
#footer {
  width: 100%;
  background-color: #3d008d;
  display: flex;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  max-width: 1250px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #fff;
}
</style>
