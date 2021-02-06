<template>
  <div id="app">
    <the-header></the-header>
    <div class="body">
      <router-view v-slot="{ Component }">
        <transition name="moveUp" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "./components/layouts/TheFooter.vue";
import TheHeader from "./components/layouts/TheHeader.vue";
export default {
  components: { TheHeader, TheFooter },
  created() {
    // this.$store.dispatch("auth/checkLogin");
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body {
  min-height: calc(91vh - 125px);
}

.moveUp-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.moveUp-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.moveUp-enter-active {
  transition: all 0.3s ease-out;
}

.moveUp-leave-active {
  transition: all 0.3s ease-in;
}

.moveUp-enter-to,
.moveUp-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
