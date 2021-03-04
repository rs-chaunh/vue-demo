import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./firebase";
import i18n from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";

router.beforeEach((to, from) => {
  console.log("from page: ", from.name);
});

const db = firebase.firestore();
if (location.hostname === "localhost") {
  console.log("localhost");
  db.settings({
    host: "localhost:8081",
    ssl: false,
  });
}

const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log(" message ", payload);
  store.commit("SET_IS_NOTIFICATION", true);
});

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(FlagIcon)
  .use(firebase)
  .mount("#app");
