import { createStore } from "vuex";
import auth from "./modules/auth";
import coaches from "./modules/coaches";
import loading from "./modules/loading";
import requests from "./modules/requests"

const store = new createStore({
  modules: {
    auth,
    coaches,
    loading,
    requests,
  },
});

export default store;
