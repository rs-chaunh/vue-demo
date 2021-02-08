import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import common
// import CoachBadge from "./components/common/CoachBadge.vue";
// import CoachButton from "./components/common/CoachButton.vue";
// import CoachCard from "./components/common/CoachCard.vue";
// import CoachLoading from "./components/common/CoachLoading.vue";
// import CoachDialog from "./components/common/CoachLoading.vue";
import firebase from "firebase/app";

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

var firebaseConfig = {
  apiKey: "AIzaSyCqaYP7DBqX6GSKLUxrD4qbcURoXxDhV24",
  authDomain: "coaches-e0de4.firebaseapp.com",
  databaseURL: "https://coaches-e0de4-default-rtdb.firebaseio.com",
  projectId: "coaches-e0de4",
  storageBucket: "coaches-e0de4.appspot.com",
  messagingSenderId: "928259795234",
  appId: "1:928259795234:web:6a222d39121d7ba8039d7b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(store)
  .use(router)
  .component("coach-dialog", CoachDialog)
  .component("coach-badge", CoachBadge)
  .component("coach-button", CoachButton)
  .component("coach-card", CoachCard)
  .component("coach-loading", CoachLoading)
  .mount("#app");
