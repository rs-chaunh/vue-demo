import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  namespaced: true,
  state: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null,
    language: localStorage.getItem("lang") || null,
  },
  mutations,
  actions,
  getters,
};
