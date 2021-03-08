import firebase from "../../firebase";
import "firebase/auth";
import "firebase/messaging";
import router from "../../router";

const messaging = firebase.messaging();
let db = firebase.firestore();

const state = {
  auth: localStorage.getItem("userID") || null,
  openDialog: false,
  loadingDialog: false,
  errorAuth: null,
  checkValid: false,
};
const getters = {};
const mutations = {
  TOGGLE_AUTH(state, payload) {
    state.auth = payload;
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

  SET_CHECK_VALID(state, payload) {
    state.checkValid = payload;
  },
};
const actions = {
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
        vapidKey: process.env.VUE_APP_VALPID_KEY_FIREBASE,
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

  errorLoginAndSignup({ commit }, payload) {
    commit("SET_OPEN_DIALOG", true);
    commit("SET_LOADING_DIALOG", true);
    setTimeout(() => {
      commit("SET_LOADING_DIALOG", false);
    }, 500);
    commit("SET_ERROR_AUTH", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
