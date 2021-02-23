import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";

//optimize lady load with asynchronous component ~(tương tự) router
const CoachDialog = defineAsyncComponent(() =>
  import("./components/common/CoachLoading.vue")
);
const CoachBadge = defineAsyncComponent(() =>
  import("./components/common/CoachBadge.vue")
);
const CoachButton = defineAsyncComponent(() =>
  import("./components/common/CoachButton.vue")
);
const CoachCard = defineAsyncComponent(() =>
  import("./components/common/CoachCard.vue")
);
const CoachLoading = defineAsyncComponent(() =>
  import("./components/common/CoachLoading.vue")
);

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  console.log("TO", to.fullPath);
  console.log("FROM", from.fullPath);
  console.log("good bye");
  // let language = to.params.lang;
  // if (!language) {
  //   language = "en";
  // }

  // i18n.locale = language;
  next();
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
