import axios from "axios";
import router from "../../router";

const API_KEY = "AIzaSyDHWnxo0i4pcV8qpmO6pEXCq6uAbPMSBok";

const state = {
  auth: {
    isAuthenticated: localStorage.getItem("userId") ? true : false,
    isError: false,
  },
};

const getters = {
  isAuthenticated: (state) => state.auth.isAuthenticated,
  isError: (state) => state.auth.isError,
};

const mutations = {
  TOGGLE_AUTH(state) {
    state.auth.isAuthenticated = !state.auth.isAuthenticated;
  },
  SET_IS_ERROR(state, status) {
    state.auth.isError = status;
  },
};

const actions = {
  login({ commit }, payload) {
    commit("SET_IS_LOADING", true);
    commit("SET_IS_ERROR", false);

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        commit("SET_IS_ERROR", false);
        commit("TOGGLE_AUTH");

        localStorage.setItem("userId", response.data.localId);

        if (router.currentRoute.value.query.redirect) {
          router.push({ name: "Register" });
        } else {
          router.push({ name: "Coaches" });
        }
      })
      .catch(() => {
        commit("SET_IS_LOADING", false);
        commit("SET_IS_ERROR", true);
      });
  },
  signup({ commit }, payload) {
    commit("SET_IS_ERROR", false);
    commit("SET_IS_LOADING", true);

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }
      )
      .then((response) => {
        commit("SET_IS_ERROR", false);
        commit("TOGGLE_AUTH");
        localStorage.setItem("userId", response.data.localId);

        if (router.currentRoute.value.query.redirect) {
          router.push({ name: "Register" });
        } else {
          router.push({ name: "Coaches" });
        }
      })
      .catch(() => {
        commit("SET_IS_LOADING", false);
        commit("SET_IS_ERROR", true);
      });
  },
  logout({ commit }) {
    commit("TOGGLE_AUTH");
    localStorage.removeItem("userId");
    router.push({ name: "Coaches" });
  },
};

export default { state, getters, mutations, actions };
