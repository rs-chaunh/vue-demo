import axios from "axios";
import router from "../../router";

const API_KEY = "AIzaSyDHWnxo0i4pcV8qpmO6pEXCq6uAbPMSBok";

const state = {
  auth: {
    isAuthenticated: localStorage.getItem("userId") ? true : false,
    errors: false,
    isAuthenticating: false
  },
};

const getters = {
  isAuthenticated: (state) => state.auth.isAuthenticated,
  errors: (state) => state.auth.errors,
  isAuthenticating: (state) => state.auth.isAuthenticating
};

const mutations = {
  TOGGLE_AUTH(state) {
    state.auth.isAuthenticated = !state.auth.isAuthenticated;
  },
  SET_ERRORS(state, status) {
    state.auth.errors = status;
  },
  SET_IS_AUTHENTICATING(state, status) {
    state.auth.isAuthenticating = status;
  }
};

const actions = {
  login({ commit }, payload) {
    commit("SET_IS_AUTHENTICATING", true);
    commit("SET_IS_LOADING", true);

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
        commit("SET_ERRORS", false);
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
        commit("SET_ERRORS", true);
      });
  },
  signup({ commit }, payload) {
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
        commit("TOGGLE_AUTH");
        localStorage.setItem("userId", response.data.localId);

        if (router.currentRoute.value.query.redirect) {
          router.push({ name: "Register" });
        } else {
          router.push({ name: "Coaches" });
        }
      })
      .catch((errors) => console.log(errors));
  },
  logout({ commit }) {
    commit("TOGGLE_AUTH");
    localStorage.removeItem("userId");
    router.push({ name: "Coaches" });
  },
};

export default { state, getters, mutations, actions };
