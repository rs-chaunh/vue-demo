import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";
import CoachDialog from "./components/common/CoachLoading.vue";
import CoachBadge from "./components/common/CoachBadge.vue";
import CoachButton from "./components/common/CoachButton.vue";
import CoachCard from "./components/common/CoachCard.vue";
import CoachLoading from "./components/common/CoachLoading.vue";

router.beforeEach((to, from) => {
  console.log("from page: ", from.name);
});

createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(FlagIcon)
  .component("coach-dialog", CoachDialog)
  .component("coach-badge", CoachBadge)
  .component("coach-button", CoachButton)
  .component("coach-card", CoachCard)
  .component("coach-loading", CoachLoading)
  .mount("#app");
