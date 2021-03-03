<template>
  <transition name="isNotification">
    <div class="notification" v-if="isNotification">
      <i @click="closeNotification" class="fa fa-lg fa-window-close"></i>
      <div class="notification__content" @click="onpenRequestPage">
        <p>You Have A Message</p>
        <router-link to="/requests">
          <i>Click here to open it!</i>
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isNotification() {
      console.log(this.$store.state.auth.isNotification);
      return this.$store.state.auth.isNotification;
    },
  },
  methods: {
    closeNotification() {
      this.$store.commit("auth/SET_NOTIFICATION", false);
    },
    onpenRequestPage() {
      this.$store.commit("auth/SET_NOTIFICATION", false);
      this.$router.push("/requests");
    },
  },
};
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  width: 250px;
  background: rgba($color: #3d008d, $alpha: 0.9);
  color: #fff;
  padding: 10px;
  top: 100px;
  right: 0px;
  cursor: pointer;
  text-align: center;
  a {
    color: #fff;
  }
  .fa-window-close {
    position: absolute;
    left: 10px;
  }
}
/*  */

.isNotification-enter-active,
.isNotification-leave-active {
  transition: 0.5s;
}
.isNotification-enter-from,
.isNotification-leave-to {
  opacity: 0;
  right: -250px;
}
.isNotification-enter-to,
.isNotification-leave-from {
  opacity: 1;
  right: 10px;
}
</style>
