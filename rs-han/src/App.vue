<template>
  <section>
    <the-heading />
    <alert-notification v-if="$store.state.common.isNotification" />
    <router-view v-slot="{ Component }">
      <transition name="animate" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </section>
</template>
<script>
import("../public/assets/styles.css");

export default {
  name: "App",
};
</script>

<style>
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
</style>
