import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./firebase";
import i18n from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";

import AlertNotification from "./components/common/AlertNotification";
import ButtonLink from "./components/common/ButtonLink";
import ErrorAuth from "./components/common/ErrorAuth";
import MyBadge from "./components/common/MyBadge";
import SelectLanguage from "./components/common/SelectLanguage";
import TheHeading from "./components/common/TheHeading";

const app = createApp(App);

app.component("AlertNotification", AlertNotification);
app.component("ButtonLink", ButtonLink);
app.component("ErrorAuth", ErrorAuth);
app.component("MyBadge", MyBadge);
app.component("SelectLanguage", SelectLanguage);
app.component("TheHeading", TheHeading);

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
  store.commit("common/SET_IS_NOTIFICATION", true);
});

app
  .use(store)
  .use(router)
  .use(i18n)
  .use(FlagIcon)
  .use(firebase)
  .mount("#app");
