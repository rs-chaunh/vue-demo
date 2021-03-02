import axios from "axios";
import router from "../../router";
import { sendFcmMessage } from "../../firebase/send-message";
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
};

const actions = {
  getAllRequests({ commit, state }) {
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
        console.log(state.requests);
      })
      .catch((err) => console.log(err));
  },
  sendNewRequest({ commit, getters }, payload) {
    const userExist = getters.filterRequestsByUserId(payload.userId);

    if (userExist) {
      userExist.listRequest.push(payload.listRequest);
      axios
        .put(
          `https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/requests/${userExist.id}.json`,
          {
            userId: payload.userId,
            listRequest: userExist.listRequest,
            isSendNotification: false
          }
        )
        .then(() => {
          commit("UPDATE_NEW_REQUEST", payload);
          router.push({ name: "Coaches" });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          "https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/requests.json",
          {
            listRequest: [payload.listRequest],
            userId: payload.userId,
            isSendNotification: false,
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
        .catch((err) => console.log(err));
    }
  },
  async notificationNewRequest({ getters, state }) {
    askForPermissioToReceiveNotifications();
    // await dispatch("getAllRequests");
    // console.log(localStorage.getItem("userId"));
    const request =
      state.requests &&
      getters.filterRequestsByUserId("yOuqABUQm1YZvMFcqMcrIjBOxCg1");
    // console.log(state.requests);

    let listNotificationNotSend;
    if (request) {
      listNotificationNotSend = request.listRequest.filter(
        (item) => item.isSendNotification === false
      );

      if (listNotificationNotSend.length > 0) {
        listNotificationNotSend.forEach((notification) => {
          axios
            .get(
              "https://book-coaches-by-charlotte-default-rtdb.firebaseio.com/devicesToken.json"
            )
            .then((res) => {
              console.log(res.data);
              const deviceTokenByUser = Object.values(res.data);
              console.log(deviceTokenByUser);
              let listActiveDevices = [];
              if (deviceTokenByUser.length > 0) {
                let deviceToken = deviceTokenByUser.find(
                  (item) => item.userId === localStorage.getItem("userId")
                );
                listActiveDevices = deviceToken
                  ? deviceToken.activeDevices
                  : [];
              }
              console.log("List: ", listActiveDevices);
              if (listActiveDevices.length > 0) {
                listActiveDevices.forEach((device) => {
                  sendFcmMessage(
                    notification.email,
                    notification.message,
                    device
                  );
                });
              }
            })
            .catch((err) => console.log(err));
        });
      }
    }
  },
};

export default { state, getters, mutations, actions };
