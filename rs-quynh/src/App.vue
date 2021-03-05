<template>
  <the-heading></the-heading>
  <router-view v-slot="{ Component }">
    <transition name="router" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <notification-box></notification-box>

</template>

<script>
import NotificationBox from './views/commons/NotificationBox.vue'
import TheHeading from './views/layouts/TheHeading.vue'

export default {
  name: 'App',
  components: {
    TheHeading,
    NotificationBox,
  },
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import "./assets/scss/style.scss";
</style>
