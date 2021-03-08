import { createStore } from "vuex";

import common from "./modules/common";
import coaches from "./modules/coaches";
import auth from "./modules/auth";

export default createStore({
  modules: {
    common,
    coaches,
    auth,
  },
});
