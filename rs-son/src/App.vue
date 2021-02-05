<template>
  <div class="app">
    <navbar></navbar>
  </div>
  <router-view> </router-view>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
html {
  font-family: Roboto, sans-serif;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}

h3,
h4 {
  margin: 0.5rem 0;
}
.open-enter-active,
.open-leave-active {
  transition: 1s;
}
.open-enter-from,
.open-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.open-enter-to,
.open-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

input:focus,
textarea:focus {
  outline: none;
  border: 1px solid #3d008d !important;
  background-color: rgba(61, 0, 141, 0.2);
}
</style>
