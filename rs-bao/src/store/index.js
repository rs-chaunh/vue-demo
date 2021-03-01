import { createStore } from "vuex";
import coachesStore from "./modules/coaches/index";
import authStore from "./modules/auth/index";
import requestsStore from "./modules/requests/index";

export default createStore({
  modules: {
    coaches: coachesStore,
    auth: authStore,
    requests: requestsStore,
  },
});
