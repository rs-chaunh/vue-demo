import i18n from "../../plugins/i18n";
import firebase from "../../firebase";
let db = firebase.firestore();

const state = {
  lang: localStorage.getItem("lang") || "gb",
  loading: false,
  isNotification: false,
};

const getters = {};

const mutations = {
  SET_LANGUAGE(state, payload) {
    state.lang = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_IS_NOTIFICATION(state, payload) {
    state.isNotification = payload;
  },
};

const actions = {
  changLanguage({ commit }, payload) {
    localStorage.setItem("lang", payload);
    commit("SET_LANGUAGE", payload);
    i18n.global.locale = payload;
  },

  addNotification({}, payload) {
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

  async logout({ dispatch, commit }) {
    localStorage.removeItem("userID");
    commit("coaches/SET_IS_REGISTER", false, { root: true });
    commit("auth/TOGGLE_AUTH", null, { root: true });
    await dispatch("deleteUsers");
    localStorage.removeItem("docID");
  },

  deleteUsers() {
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
