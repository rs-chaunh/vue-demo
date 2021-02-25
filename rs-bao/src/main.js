import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

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

router.beforeEach((to, from) => {
  // to and from are both route objects. must call `next`.
  console.log("TO", to.fullPath);
  console.log("FROM", from.fullPath);
  console.log("good bye");
});

createApp(App)
  .use(store)
  .use(router)
  .component("coach-dialog", CoachDialog)
  .component("coach-badge", CoachBadge)
  .component("coach-button", CoachButton)
  .component("coach-card", CoachCard)
  .component("coach-loading", CoachLoading)
  .mount("#app");
