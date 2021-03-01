import axios from "axios";
const url = "https://coaches-e0de4-default-rtdb.firebaseio.com/coaches.json";

export default {
  async registerCoach({ commit, rootGetters }, data) {
    // const userId = state.coaches.length++;
    const user = rootGetters["auth/user"];
    const coachData = {
      id: user,
      firstName: data.first,
      lastName: data.last,
      description: data.des,
      hourlyRate: data.hour,
      areas: data.areas,
    };

    const response = await axios.put(
      `https://coaches-e0de4-default-rtdb.firebaseio.com/coaches/${user}.json`,
      coachData
    );

    if (response.status !== "200") {
      // const error = new Error(response.statusText);
      // throw error;
    }

    commit("registerCoaches", {
      ...coachData,
      id: user,
    });
  },

  //GET ALL COACHES FROM API
  async fetchCoaches({ commit }) {
    const response = await axios.get(`${url}`);
    const responseData = response.data;

    if (response.status !== "200") {
      //error
    }

    const coaches = [];
    for (var keyItem in responseData) {
      const coach = {
        id: keyItem,
        firstName: responseData[keyItem].firstName,
        lastName: responseData[keyItem].lastName,
        description: responseData[keyItem].description,
        hourlyRate: responseData[keyItem].hourlyRate,
        areas: responseData[keyItem].areas,
      };
      coaches.push(coach);
    }

    commit("setCoaches", coaches);
  },

  async fetchCoachesDetail({ commit }, payload) {
    const response = await axios.get(
      `https://coaches-e0de4-default-rtdb.firebaseio.com/coaches/${payload}.json`
    );
    commit("setCoaches", response.data);
  },
};
