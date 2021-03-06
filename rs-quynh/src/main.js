import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores";
import i18n from "./plugins/i18n";

createApp(App)
  .use(router)
  .use(store)
  .use(i18n)
  .mount("#app");