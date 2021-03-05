import axios from "axios";
import router from "../../router";
import { sendFcmMessageToListToken } from "../../firebase/send-message";
import { askForPermissioToReceiveNotifications } from "../../firebase/push-notification";

const state = {
  requests: [],
};

const getters = {
  getRequests: (state) => state.requests,
  filterRequestsByUserId: (state) => (id) => {
    return state.requests.find((request) => {
      return request.userId === id;
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
  UPDATE_STATUS_REQUEST(state, payload) {
    state.requests = state.requests.map((item) => {
      if (item.userId === payload.userId) {
        item.listRequest.forEach((request) => {
          if (request.id === payload.requestId) {
            request.isSendNotification = payload.status;
          }
        });
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
  sendNewRequest({ commit, getters, dispatch }, payload) {
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

    const receiver = getters.getCoachByUserId(payload.userId);
      console.log(payload);
    if (receiver) {
      sendFcmMessageToListToken(
        payload.listRequest.email,
        payload.listRequest.message,
        receiver.deviceTokens
      );
      dispatch("updateStatusRequest", {
        userId: payload.userId,
        requestId: payload.listRequest.id,
        status: true,
      });
    }
  },
  updateStatusRequest({ commit, getters }, payload) {
    const requestOfUser = getters.filterRequestsByUserId(payload.userId);
    if (requestOfUser) {
      const listRequest = requestOfUser.listRequest
        ? requestOfUser.listRequest.map((item) => {
            if (item.id === payload.requestId)
              item.isSendNotification = payload.status;
            return item;
          })
        : [];
      axios
        .put(
          `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/requests/${requestOfUser.id}.json`,
          {
            userId: requestOfUser.userId,
            listRequest: listRequest,
          }
        )
        .then(() => {
          commit("UPDATE_STATUS_REQUEST", payload);
        })
        .catch((err) => console.log(err));
    }
  },
  notificationNewRequest({ getters, state, dispatch }) {
    askForPermissioToReceiveNotifications();
    const userId = localStorage.getItem("userId");
    const request = state.requests && getters.filterRequestsByUserId(userId);
    if (request) {
      let listNotificationNotSend = request.listRequest.filter((item) => {
        return item.isSendNotification === false;
      });
      const receiver = getters.getCoachByUserId(userId);
      if (listNotificationNotSend.length > 0 && receiver) {
        listNotificationNotSend.forEach((notification) => {
          sendFcmMessageToListToken(
            notification.email,
            notification.message,
            receiver.deviceTokens
          );
          dispatch("updateStatusRequest", {
            userId: userId,
            requestId: notification.id,
            status: true,
          });
        });
      }
    }
  },
};

export default { state, getters, mutations, actions };
