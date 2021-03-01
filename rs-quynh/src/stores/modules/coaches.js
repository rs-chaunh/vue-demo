import axios from "axios";
import router from "../../router";

const state = {
  coaches: [],
  coachDetail: [],
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
};

const mutations = {
  SET_COACHES_DATA(state, coaches) {
    state.coaches = coaches;
  },
  ADD_NEW_COACH(state, coach) {
    state.coaches.push(coach);
  },
  SET_COACH_DETAIL(state, coach) {
    state.coachDetail = coach;
  },
};

const actions = {
  getAllCoaches({ commit }) {
    commit("SET_IS_LOADING", true);
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
      .catch((e) => {
        console.log(e);
      });
  },
  getCoachById({ commit }, id) {
    axios
      .get(
        `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/coaches/${id}.json`
      )
      .then((response) => {
        commit("SET_COACH_DETAIL", { ...response.data, id: id });
      })
      .catch((e) => console.log(e));
  },
  addNewCoach({ commit }, coach) {
    axios
      .post(
        `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/coaches.json`,
        {
          ...coach,
          userId: localStorage.getItem("userId"),
        }
      )
      .then(() => {
        commit("ADD_NEW_COACH", {
          id: localStorage.getItem("userId"),
          ...coach,
        });
        router.push({ name: "Coaches" });
      })
      .catch((err) => console.log(err));
  },
};

export default { state, getters, mutations, actions };
