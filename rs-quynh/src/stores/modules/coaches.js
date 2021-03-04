import axios from "axios";
import router from "../../router";
import firebase from "../../firebase/firebase-config";
import "firebase/messaging";

const state = {
  coaches: [],
  coachDetail: [],
  token: "",
  dataAreas: [
    { id: "frontend", name: "Frontend Development" },
    { id: "backend", name: "Backend Development" },
    { id: "career", name: "Career Advisory" },
  ],
};

const getters = {
  getCoaches: (state) => state.coaches,
  getDataAreas: (state) => state.dataAreas,
  getCoachDetail: (state) => state.coachDetail,
  getCoachById: (state) => (id) => {
    return state.coaches.find((coach) => coach.id === id);
  },
  getCoachByUserId: (state) => (id) => {
    return state.coaches.find((coach) => coach.userId === id);
  },
};

const mutations = {
  SET_COACHES_DATA(state, coaches) {
    state.coaches = coaches;
  },
  ADD_NEW_COACH(state, coach) {
    state.coaches.push(coach);
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_COACH_DETAIL(state, coach) {
    state.coachDetail = coach;
  },
  SET_TOKEN_IN_COACH(state, payload) {
    state.coaches = state.coaches.map((coach) => {
      if (coach.id === payload.id) {
        coach.deviceTokens = payload.tokens;
      }
      return coach;
    });
  },
};

const actions = {
  getAllCoaches({ commit }) {
    commit("SET_IS_LOADING", true);
    commit("SET_IS_ERROR", false);
    axios
      .get(
        `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/coaches.json`
      )
      .then((response) => {
        const data = response.data;
        const arrayData = [];
        for (const key in data) {
          arrayData.push({ id: key, ...data[key] });
        }
        commit("SET_COACHES_DATA", arrayData);
        commit("SET_IS_LOADING", false);
      })
      .catch(() => {
        commit("SET_IS_ERROR", true);
      });
    
  },
  getCoachById({ commit }, id) {
    commit("SET_IS_ERROR", false);

    axios
      .get(
        `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/coaches/${id}.json`
      )
      .then((response) => {
        commit("SET_COACH_DETAIL", { ...response.data, id: id });
      })
      .catch(() => {
        commit("SET_IS_ERROR", true);
      });
  },
  async getToken({ commit }) {
    const messaging = firebase.messaging();
    await messaging
      .getToken()
      .then((res) => {
        commit("SET_TOKEN", res);
      })
      .catch((err) => console.log(err));
  },
  addNewCoach({ state, commit }, coach) {
    commit("SET_IS_LOADING", true);
    commit("SET_IS_ERROR", false);

    axios
      .post(
        `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/coaches.json`,
        {
          ...coach,
          userId: localStorage.getItem("userId"),
          deviceTokens: [state.token],
        }
      )
      .then(() => {
        commit("ADD_NEW_COACH", {
          id: localStorage.getItem("userId"),
          deviceTokens: [state.token],
          ...coach,
        });
        router.push({ name: "Coaches" });
      })
      .catch(() => {
        commit("SET_IS_LOADING", false);
        commit("SET_IS_ERROR", true);
      });
  },
  removeToken({ state, getters, commit }) {
    const coachByUserId = getters.getCoachByUserId(
      localStorage.getItem("userId")
    );
    if (coachByUserId) {
      const deviceTokens = coachByUserId.deviceTokens
        ? coachByUserId.deviceTokens
        : [];
      deviceTokens.splice(deviceTokens.indexOf(state.token), 1);
      axios
        .put(
          `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/coaches/${coachByUserId.id}.json`,
          {
            ...coachByUserId,
            id: null,
            deviceTokens: deviceTokens,
          }
        )
        .then(() => {
          commit("SET_TOKEN_IN_COACH", {
            id: coachByUserId.id,
            tokens: deviceTokens,
          });
        })
        .catch((err) => console.log(err));
    }
  },
  addToken({ state, getters, commit }) {
    const coachByUserId = getters.getCoachByUserId(
      localStorage.getItem("userId")
    );
    if (coachByUserId) {
      const deviceTokens = coachByUserId.deviceTokens
        ? coachByUserId.deviceTokens
        : [];
      if (deviceTokens.indexOf(state.token) === -1)
        deviceTokens.push(state.token);
      
      axios
        .put(
          `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/coaches/${coachByUserId.id}.json`,
          {
            ...coachByUserId,
            id: null,
            deviceTokens: deviceTokens,
          }
        )
        .then(() => {
          commit("SET_TOKEN_IN_COACH", {
            id: coachByUserId.id,
            tokens: deviceTokens,
          });
        })
        .catch((err) => console.log(err));
    }
  },
};

export default { state, getters, mutations, actions };
