import axios from "axios";
import router from "../../router";

const state = {
  requests: [],
};

const getters = {
  getRequests: (state) => state.requests,
  filterRequestsByUserId: (state) => (id) => {
    return state.requests.find((request) => {
      return request.userId === id
    });
  },
};

const mutations = {
  SET_REQUESTS(state, payload) {
    state.requests = payload;
  },
  ADD_NEW_REQUEST(state, payload) {
    state.requests.push(payload);
  },
  UPDATE_NEW_REQUEST(state, payload) {
    state.requests = state.requests.map((item) => {
      if (item.id === payload.id) {
        item.listRequest.push(payload.listRequest);
      }
      return item;
    });
  },
};

const actions = {
  getAllRequests({ commit }) {
    commit("SET_IS_ERROR", false);

    axios
      .get(
        "https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/requests.json"
      )
      .then((response) => {
        const data = response.data;
        const arrayData = [];
        for (const key in data) {
          arrayData.push({ id: key, ...data[key] });
        }
        commit("SET_REQUESTS", arrayData);
      })
      .catch(() => {
        commit("SET_IS_ERROR", true);
      });
  },
  sendNewRequest({ commit, getters }, payload) {
    const userExist = getters.filterRequestsByUserId(payload.userId);
    commit("SET_IS_ERROR", false);

    if (userExist) {
      userExist.listRequest.push(payload.listRequest);
      axios
        .put(
          `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/requests/${userExist.id}.json`,
          {
            userId: payload.userId,
            listRequest: userExist.listRequest,
          }
        )
        .then(() => {
          commit("UPDATE_NEW_REQUEST", payload);
          router.push({ name: "Coaches" });
        })
        .catch(() => {
          commit("SET_IS_ERROR", true);
        });
    } else {
      axios
        .post(
          "https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/requests.json",
          {
            listRequest: [payload.listRequest],
            userId: payload.userId,
          }
        )
        .then((response) => {
          commit("ADD_NEW_REQUEST", {
            id: response.data.localId,
            listRequest: [payload.listRequest],
            userId: payload.userId,
          });
          router.push({ name: "Coaches" });
        })
        .catch(() => {
          commit("SET_IS_ERROR", true);
        });
    }
  },
};

export default { state, getters, mutations, actions };
