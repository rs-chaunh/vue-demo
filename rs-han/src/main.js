import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import i18n from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";

var firebaseConfig = {
  apiKey: "AIzaSyDivKplX5nAojJZ9kFMn9hZ0oF_Ntas1Os",
  authDomain: "my-coaches.firebaseapp.com",
  databaseURL: "https://my-coaches-default-rtdb.firebaseio.com",
  projectId: "my-coaches",
  storageBucket: "my-coaches.appspot.com",
  messagingSenderId: "388672539755",
  appId: "1:388672539755:web:4cf2c81179079df409352e",
  measurementId: "G-CVE743ESLV",
};

firebase.initializeApp(firebaseConfig);

router.beforeEach((to, from) => {
  console.log("from page: ", from.name);
});

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(FlagIcon)
  .mount("#app");
