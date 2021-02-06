import axios from "axios";
export default {
  //SIGNUP
  async signUp({ commit }, payload) {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqaYP7DBqX6GSKLUxrD4qbcURoXxDhV24";

    const response = await axios.post(url, {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    });

    if (response.status !== "200") {
      //error
    }

    localStorage.setItem("user", response.data.localId);
    localStorage.setItem("token", response.data.idToken);

    commit("setUser", {
      user: response.data.localId,
      token: response.data.idToken,
    });
  },

  //LOGIN
  async login({ commit }, payload) {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqaYP7DBqX6GSKLUxrD4qbcURoXxDhV24";

    const response = await axios.post(url, {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    });

    if (response.status !== "200") {
      //error
    }

    localStorage.setItem("user", response.data.localId);
    localStorage.setItem("token", response.data.idToken);

    commit("setUser", {
      user: response.data.localId,
      token: response.data.idToken,
    });
  },

  logout({ commit }) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    commit("setUser", {
      user: null,
      token: null,
    });
  },
};
