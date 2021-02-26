<template>
  <div>
    <div class="notification-box" :class="notify ? 'open' : null">
      <a href="#" class="notification-close" @click="() => closed()" title="close"
        >x</a
      >
      <div class="notification-data">
        <div class="notification-title">
          <p>{{ title }}</p>
        </div>
        <div class="notification-notice">
          <p>{{ message }}</p>
        </div>
      </div>
      <notification-box-progress-time
        :progress="progress"
    ></notification-box-progress-time>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/messaging";
import NotificationBoxProgressTime from './NotificationBoxProgressTime.vue';

export default {
  components: { NotificationBoxProgressTime },
  data() {
    return {
      title: "",
      message: "",
      currentMessage: "",
      notify: false,
      progress: 0,
    };
  },
  computed: {
    messaging() {
      return firebase.messaging();
    },
  },
  methods: {
    receiveMessage() {
      try {
        this.messaging.onMessage((payload) => {
          this.currentMessage = payload;
          this.setNotificationBoxForm(payload.data.title, payload.data.body);
          this.notify = true;
            setTimeout(() => {
              this.notify = false;
            }, 5000);
            this.startTime();
        });
      } catch (e) {
        console.log(e);
      }
    },

    setNotificationBoxForm(title, message) {
      this.title = title;
      this.message = message;
    },

    closed() {
      this.notify = false;
    },

    startTime() {
      let vm = this;
      let setIntervalRef = setInterval(function () {
        vm.progress++;
        if (vm.progress === 100) {
          vm.progress = 0;
          clearInterval(setIntervalRef);
        }
      }, 50);
    },
  },

  created() {
    this.receiveMessage();
  },
};
</script>

<style lang="scss" scoped>
.notification-box {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: -100%;
  top: 10px;
  width: 300px;
  background-color: #07c50e;
  z-index: 999;
  transition: all 0.5s;
  &.open {
    right: 5px;
  }
}
.notification-close {
  position: absolute;
  color: #fff;
  font: 14px;
  right: 5px;
  text-decoration: none;
  top: 2px;
  z-index: 10;
  cursor: pointer;
}
.notification-data {
  margin: 0 20px;
  p {
    margin: 10px 0;
  }
  .notification-title p {
    font-size: 18px;
    font-weight: bold;
    line-height: 18px;
  }
  .notification-notice p {
    font-size: 14px;
    font-weight: 400;
  }
}
.notification-time small {
  font-size: 12px;
}
.notification-wall-number small {
  font-size: 8px;
}
img {
  width: 30px;
}
</style>    