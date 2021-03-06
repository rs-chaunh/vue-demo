//bên trong action của module, context.state sẽ expose ra local state và root state sẽ được expose như là context.rootState

import axios from "axios";

//Để dispatch các action và commit các mutation trong global namespace, truyền { root: true } như là tham số thứ 3 vào dispatch và commit

export default {
  //send request to an email
  async contact({ commit }, payload) {
    const newRequest = {
      userEmail: payload.email,
      userMessage: payload.message,
    };

    const response = await axios.post(
      `https://coaches-e0de4-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      newRequest
    );

    if (response.status !== "200") {
      const error = "Failed to send request.";
      throw error;
    }

    commit("addRequest", newRequest);
  },

  // fetch request from API
  async fetchRequest({ commit, rootGetters }) {
    const coachId = rootGetters["auth/user"];
    const response = await axios.get(
      `https://coaches-e0de4-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );

    if (response.status !== "200") {
      //error
    }

    const responseData = response.data;
    const requests = [];

    for (const items in responseData) {
      const request = {
        id: items,
        coachId: coachId,
        userEmail: responseData[items].userEmail,
        userMessage: responseData[items].userMessage,
      };
      requests.push(request);
    }

    commit("setRequest", requests);
  },
};
