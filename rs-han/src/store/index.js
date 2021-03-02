import { createStore } from "vuex";
import router from "../router";
import axios from "axios";
import firebase from "../firebase";
import "firebase/auth";
import "firebase/messaging";

import i18n from "../plugins/i18n";

const messaging = firebase.messaging();
let db = firebase.firestore();

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
    lang: localStorage.getItem("lang") || "gb",
    errorAuth: null,
    checkValid: false,
    isNotification: false,
  },
  getters: {
    allCoaches: (state) => {
      return state.coaches.filter((coaches) => {
        let flag = false;
        for (let i = 0; i < coaches.areas.length; i++) {
          if (state.areas.indexOf(coaches.areas[i]) != -1) {
            flag = true;
            break;
          }
        }
        return flag;
      });
    },
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

    async sendRequest({ dispatch }, payload) {
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
      await dispatch("addNotification", payload);
      router.push({ name: "Coaches" });
    },

    addNotification({}, payload) {
      // let db = firebase.firestore();
      db.collection("messages")
        .add({
          id: payload.id,
          title: "You receive a notification from email : " + payload.email,
          content: payload.message,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          localStorage.setItem("docID", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
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

    async logout({ dispatch, commit }) {
      localStorage.removeItem("userID");
      commit("SET_IS_REGISTER", false);
      commit("TOGGLE_AUTH", null);
      await dispatch("deleteUsers");
      localStorage.removeItem("docID");
    },

    deleteUsers() {
      // let db = firebase.firestore();
      db.collection("users")
        .doc(localStorage.getItem("docID"))
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
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

    async loginOrSignup({ dispatch, commit }, payload) {
      let method;
      let userID;
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
        await method
          .then((userCredential) => {
            userID = userCredential.user.uid;
            commit("TOGGLE_AUTH", userID);
            localStorage.setItem("userID", userID);
            dispatch("getTokenFCM", userID);
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

    getTokenFCM({}, userID) {
      messaging
        .getToken({
          vapidKey:
            "BKJRY0TZ_tn1Afod5lvQNuxlb63cqNxNfBdCq1UzLLCfemeVUFmrlBzOuWSmG3TktVRmyk862XGhDEgD5UWnvTM",
        })
        .then((currentToken) => {
          if (currentToken) {
            localStorage.setItem("fcmToken", currentToken);
            db.collection("users")
              .add({
                tokens: currentToken,
                userUid: userID,
              })
              .then((docRef) => {
                localStorage.setItem("docID", docRef.id);
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    },

    changLanguage({ commit }, payload) {
      localStorage.setItem("lang", payload);
      commit("SET_LANGUAGE", payload);
      i18n.global.locale = payload;
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

    SET_LANGUAGE(state, payload) {
      state.lang = payload;
    },

    SET_IS_NOTIFICATION(state, payload) {
      state.isNotification = payload;
    },
  },
});
