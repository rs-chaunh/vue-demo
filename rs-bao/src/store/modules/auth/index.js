import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  namespaced: true,
  state: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null,
  },
  mutations,
  actions,
  getters,
};
