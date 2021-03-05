import { createStore } from "vuex";
import auth from "./modules/auth";
import coaches from "./modules/coaches";
import loading from "./modules/loading";
import requests from "./modules/requests"
import error from "./modules/error";


const store = new createStore({
  modules: {
    auth,
    coaches,
    loading,
    requests,
    error
  },
});

export default store;
