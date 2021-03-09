import axios from "axios";
import router from "../../router";

const state = {
  areas: ["frontend", "backend", "fullstack"],
  coaches: [],
  infoCoaches: [],
  isRegisterCoaches: false,
};

const getters = {
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
};

const mutations = {
  SET_COACHES(state, payload) {
    state.coaches = payload;
  },
  FILTER_COACHES(state, payload) {
    state.areas = payload;
  },
  SET_IS_REGISTER(state, payload) {
    state.isRegisterCoaches = payload;
  },
  SET_INFO_COACHES(state, payload) {
    state.infoCoaches = payload;
  },
};

const actions = {
  async getCoaches({ commit }) {
    commit("common/SET_LOADING", true, { root: true });
    try {
      const response = await axios.get(
        process.env.VUE_APP_COACHES_FIREBASE_URL
      );
      const coachesData = response.data;
      const resCoaches = Object.entries(coachesData).map((el) => {
        return { ...el[1], id: el[0] };
      });
      commit("SET_COACHES", resCoaches);
      commit("common/SET_LOADING", false, { root: true });
    } catch (error) {
      console.log(error);
    }
  },
  async getUserRegister({ dispatch }) {
    axios
      .get(process.env.VUE_APP_COACHES_FIREBASE_URL)
      .then((response) => {
        let listIdCoaches = [];
        if (response.data) {
          for (let i = 0; i < Object.values(response.data).length; i++) {
            listIdCoaches.push(Object.values(response.data)[i].id);
          }
        }
        dispatch("checkUserRegister", listIdCoaches);
      })
      .catch((error) => console.log(error));
  },

  async sendRequest({ dispatch }, payload) {
    try {
      await axios
        .post(process.env.VUE_APP_REQUEST_FIREBASE_URL, {
          id: payload.id,
          email: payload.email,
          message: payload.message,
        })
        .catch((error) => console.log(error));
      router.push({ name: "Coaches" });
    } catch (error) {
      console.log(error);
    }
    await dispatch("common/addNotification", payload, { root: true });
    router.push({ name: "Coaches" });
  },

  async registerCoaches({ dispatch, commit }, payload) {
    await axios
      .post(process.env.VUE_APP_COACHES_FIREBASE_URL, {
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
    commit("common/SET_LOADING", true, { root: true });
    await axios
      .get(process.env.VUE_APP_REQUEST_FIREBASE_URL)
      .then((response) => {
        commit("common/SET_LOADING", false, { root: true });
        for (let i = 0; i < Object.values(response.data).length; i++) {
          if (
            Object.values(response.data)[i].id == localStorage.getItem("userID")
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
      .get(process.env.VUE_APP_DATABASE_FIREBASE_URL + id + ".json")
      .then((response) => {
        commit("SET_INFO_COACHES", response.data);
      });
  },

  checkUserRegister({ commit, rootState }, payload) {
    if (rootState.auth.auth != null) {
      if (payload.indexOf(rootState.auth.auth) != -1) {
        commit("SET_IS_REGISTER", true);
      } else {
        commit("SET_IS_REGISTER", false);
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
