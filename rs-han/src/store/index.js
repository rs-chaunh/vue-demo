import { createStore } from "vuex";
import router from "../router";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";

export default createStore({
  state: {
    areas: ["frontend", "backend", "fullstack"],
    coaches: [],
    infoCoaches: [],
    auth: localStorage.getItem("userID") || null,
    loading: false,
    isFindCoaches: false,
    isRegister: false,
    openDialog: false,
    loadingDialog: false,
    errorAuth: null,
    checkValid: false,
  },
  getters: {
    allCoaches: (state) => {
      return state.coaches.filter(
        (coaches, i) => state.areas.indexOf(coaches.areas[i]) != -1
      );
    },
    checkLogin: (state) => state.auth != null,
  },
  actions: {
    async getCoaches({ commit }) {
      commit("SET_LOADING", true);
      const resCoaches = [];
      try {
        const response = await axios.get(
          "https://my-coaches-default-rtdb.firebaseio.com/coaches.json"
        );
        if (response.data == null) {
          commit("SET_FIND_COACHES", false);
        } else {
          commit("SET_FIND_COACHES", true);
          let obj = Object.values(response.data);
          for (let i = 0; i < obj.length; i++) {
            let id = { id: Object.keys(response.data)[i] };
            let temp = Object.assign(obj[i], id);
            resCoaches.push(temp);
          }
        }
        commit("SET_COACHES", resCoaches);
        setTimeout(() => {
          commit("SET_LOADING", false);
        }, 700);
      } catch (error) {
        console.log(error);
      }
    },

    async getUserRegister({ dispatch }) {
      try {
        axios
          .get("https://my-coaches-default-rtdb.firebaseio.com/coaches.json")
          .then((response) => {
            let tempArr = [];
            if (response.data) {
              for (let i = 0; i < Object.values(response.data).length; i++) {
                tempArr.push(Object.values(response.data)[i].id);
              }
            }
            dispatch("checkUserRegister", tempArr);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    },

    async sendRequest({}, payload) {
      try {
        await axios
          .post("https://my-coaches-default-rtdb.firebaseio.com/request.json", {
            id: payload.id,
            email: payload.email,
            message: payload.message,
          })
          .catch((error) => console.log(error));
        router.push({ name: "Coaches" });
      } catch (error) {
        console.log(error);
      }
    },

    async registerCoaches({ dispatch, commit }, payload) {
      await axios
        .post("https://my-coaches-default-rtdb.firebaseio.com/coaches.json", {
          id: payload.id,
          areas: payload.areas,
          description: payload.description,
          firstName: payload.firstName,
          lastName: payload.lastName,
          hourlyRate: payload.hourlyRate,
        })
        .catch((error) => console.log(error));
      dispatch("getCoaches");
      commit("SET_IS_REGISTER", true);
      router.push({ name: "Coaches" });
    },

    async requestCoaches({ commit }, request) {
      commit("SET_LOADING", true);
      await axios
        .get("https://my-coaches-default-rtdb.firebaseio.com/request.json")
        .then((response) => {
          setTimeout(() => {
            commit("SET_LOADING", false);
          }, 700);
          for (let i = 0; i < Object.values(response.data).length; i++) {
            if (
              Object.values(response.data)[i].id ==
              localStorage.getItem("userID")
            ) {
              request.push(Object.values(response.data)[i]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    infoCoaches({ commit }, id) {
      axios
        .get(
          "https://my-coaches-default-rtdb.firebaseio.com/coaches/" +
            id +
            ".json"
        )
        .then((response) => {
          commit("SET_INFO_COACHES", response.data);
        });
    },

    logout({ commit }) {
      localStorage.removeItem("userID");
      commit("SET_IS_REGISTER", false);
      commit("TOGGLE_AUTH", null);
    },

    checkUserRegister({ commit, state }, payload) {
      if (state.auth != null) {
        if (payload.indexOf(state.auth) != -1) {
          commit("SET_USER_REGISTER", true);
        } else {
          commit("SET_USER_REGISTER", false);
        }
      }
    },

    loginOrSignup({ dispatch, commit }, payload) {
      let method;
      if (payload.isLogin) {
        method = firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
      } else {
        method = firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
      }
      if (payload.email == "" || payload.password == "") {
        commit("SET_CHECK_VALID", true);
      } else {
        commit("SET_CHECK_VALID", false);
        commit("SET_OPEN_DIALOG", true);
        commit("SET_LOADING_DIALOG", true);
        method
          .then((userCredential) => {
            var user = userCredential.user;
            commit("TOGGLE_AUTH", user.uid);
            localStorage.setItem("userID", user.uid);
            setTimeout(() => {
              commit("SET_OPEN_DIALOG", false);
              commit("SET_LOADING_DIALOG", false);
              if (payload.url) {
                router.push({ name: "Register" });
              } else {
                router.push({ name: "Coaches" });
              }
            }, 500);
          })
          .catch((error) => {
            dispatch("errorLoginAndSignup", error.message);
          });
      }
    },

    errorLoginAndSignup({ commit }, payload) {
      commit("SET_OPEN_DIALOG", true);
      commit("SET_LOADING_DIALOG", true);
      setTimeout(() => {
        commit("SET_LOADING_DIALOG", false);
      }, 500);
      commit("SET_ERROR_AUTH", payload);
    },
  },
  mutations: {
    SET_COACHES(state, payload) {
      state.coaches = payload;
    },
    TOGGLE_AUTH(state, payload) {
      state.auth = payload;
    },
    FILTER_COACHES(state, payload) {
      state.areas = payload;
    },

    SET_IS_REGISTER(state, payload) {
      state.isRegister = payload;
    },

    SET_LOADING(state, payload) {
      state.loading = payload;
    },

    SET_FIND_COACHES(state, payload) {
      state.isFindCoaches = payload;
    },

    SET_OPEN_DIALOG(state, payload) {
      state.openDialog = payload;
    },

    SET_LOADING_DIALOG(state, payload) {
      state.loadingDialog = payload;
    },

    SET_ERROR_AUTH(state, payload) {
      state.errorAuth = payload;
    },

    SET_USER_REGISTER(state, payload) {
      state.isRegister = payload;
    },
    SET_INFO_COACHES(state, payload) {
      state.infoCoaches = payload;
    },

    SET_CHECK_VALID(state, payload) {
      state.checkValid = payload;
    },
  },
});
