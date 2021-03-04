<template>
    <router-link :to="{ path: '/requests', name: 'Requests'}" v-if="isShow" id="toast" class="toast toast--info">
        <div class="toast__icon">
            <i class="fas fa-bell"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">{{ title }}</h3>
            <p class="toast__msg">{{ message }}</p>
        </div>
        <div class="toast__close" @click="clostNotify">
            <i class="fas fa-times-circle"></i>
        </div>
    </router-link>
</template>

<script>
import firebase from "../../firebase/firebaseConfig";
import "firebase/messaging";
export default {
    data() {
        return {
            isShow: false,
            title: "",
            message: ""
        };
    },
    methods: {
        clostNotify() {
            this.isShow = false;
        }
    },
    created() {
        const messaging = firebase.messaging();
        try {
            messaging.onMessage(payload => {
                console.log("Message received. ", payload);
                this.isShow = true;
                this.title = payload.notification.title;
                this.message = payload.notification.body;
                setTimeout(() => {
                    this.isShow = false;
                    this.title = "";
                    this.message = "";
                }, 3000);
            });
        } catch (err) {
            console.log(err);
        }
    }
};
</script>

<style scope>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


#toast {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 999999;
  text-decoration: none;
}

.toast {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 2px;
  padding: 20px 0;
  min-width: 400px;
  max-width: 450px;
  border-left: 4px solid;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.08);
  transition: all linear 0.3s;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(calc(100% + 32px));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}

.toast--info {
  border-color: #3d008d;
}

.toast--info .toast__icon {
  color: #3d008d;
}

.toast + .toast {
  margin-top: 24px;
}

.toast__icon {
  font-size: 24px;
}

.toast__icon,
.toast__close {
  padding: 0 16px;
}

.toast__body {
  flex-grow: 1;
}

.toast__title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.toast__msg {
  font-size: 14px;
  color: #888;
  margin-top: 6px;
  line-height: 1.5;
}

.toast__close {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>
