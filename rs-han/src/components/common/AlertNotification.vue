<template>
  <div
    id="alert"
    :class="[
      { alert: isAlert },
      { hide: isHide },
      { show: isShow },
      { showAlert: isAlert },
    ]"
  >
    <i class="far fa-bell"></i>
    <router-link :to="{ name: 'CoachesRequest' }" @click="closeNotify()">
      <span class="msg">Notify: You recieved a request!</span>
    </router-link>
    <div class="close-btn" @click="closeNotify()">
      <i class="fas fa-times"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertNotification",
  data() {
    return {
      isAlert: true,
      isHide: true,
      isShow: false,
      isShowAlert: false,
    };
  },
  created() {
    this.isShow = true;
    this.isHide = false;
    this.isShowAlert = true;
    setTimeout(() => {
      this.isShow = false;
      this.isHide = true;
      this.$store.commit("SET_IS_NOTIFICATION", false);
    }, 5000);
  },

  methods: {
    closeNotify() {
      this.isShow = false;
      this.isHide = true;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");
* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
body {
  display: grid;
  place-items: center;
  overflow: hidden;
}

.alert {
  background: #3d008d;
  padding: 20px 40px;
  min-width: 420px;
  position: absolute;
  right: 0;
  top: 100px;
  border-radius: 4px;
  border-left: 8px solid#3d008d;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}
.alert.showAlert {
  opacity: 1;
  pointer-events: auto;
}
.alert.show {
  animation: show_slide 1s ease forwards;
}
@keyframes show_slide {
  0% {
    transform: translateX(100%);
  }
  40% {
    transform: translateX(-10%);
  }
  80% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-10px);
  }
}
.alert.hide {
  animation: hide_slide 1s ease forwards;
}
@keyframes hide_slide {
  0% {
    transform: translateX(-10px);
  }
  40% {
    transform: translateX(0%);
  }
  80% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(100%);
  }
}
.alert .fa-exclamation-circle {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #ffff;
  font-size: 30px;
}
.alert .msg {
  padding: 0 20px;
  font-size: 18px;
  color: #ffff;
}
.alert .close-btn {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  background: #3d008d;
  padding: 20px 18px;
  cursor: pointer;
}
.alert .close-btn:hover {
  background: #3d008d;
}
.alert .close-btn .fas {
  color: #ffff;
  font-size: 22px;
  line-height: 40px;
}
</style>
