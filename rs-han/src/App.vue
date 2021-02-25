<template>
  <section>
    <the-heading />
    <router-view v-slot="{ Component }">
      <transition name="animate" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </section>
</template>
<script>
import TheHeading from "./components/common/TheHeading";
export default {
  name: "App",
  components: { TheHeading },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);

html {
  font-family: "Roboto", sans-serif;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*,
:focus :active {
  outline: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.outline:hover {
  background-color: #edd2ff;
}

.my-button {
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

.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}

.animate-enter-from {
  transform: translateY(-50px);
  transition: 0.3s;
  opacity: 0;
}
.animate-enter-to {
  transform: translateY(0);
  transition: 0.3s;
  opacity: 1;
}
.animate-enter-active {
  transition-delay: 0.3s;
  animation-delay: 0.3s;
}
.animate-leave-from {
  transform: translateY(0px);
  transition: 0.3s;
  opacity: 1;
}
.animate-leave-to {
  transform: translateY(50px);
  transition: 0.3s;
  opacity: 0;
}
</style>
