import { createStore } from "vuex";
import axios from "axios";
import router from "../router/router";
import firebase from "../firebase/firebaseConfig";
const DB_REQUESTS = firebase.ref("/requests");
const DB_COACHES = firebase.ref("/coaches");
const API_LOGIN =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBviMPpTk73p83yhE6hW7swWQ7YZNOYGC8";
const API_SIGNUP =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBviMPpTk73p83yhE6hW7swWQ7YZNOYGC8";

const store = createStore({
    state() {
        return {
            token: localStorage.getItem("token") || null,
            userId: localStorage.getItem("userId") || null,
            tokenExpiration: localStorage.getItem("tokenExpiration") || null,
            coaches: [],
            requests: [],
            filterOption: ["frontend", "backend", "career"],
            login: true,
            loading: false,
            backdrop: false
        };
    },
    getters: {
        isAuthenticated(state) {
            return state.userId !== null && state.token !== null;
        },
        isRegistered(state) {
            return state.coaches.filter(e => e.id == state.userId).length > 0;
        },
    },
    mutations: {
        SET_AUTH_USER(state, userData) {
            state.token = userData.token;
            state.userId = userData.userId;
            state.tokenExpiration = userData.expiresIn;
            localStorage.setItem("token", userData.token);
            localStorage.setItem("userId", userData.userId);
            localStorage.setItem("tokenExpiration", userData.expiresIn);
        },
        CLEAR_AUTH_USER(state) {
            state.token = null;
            state.userId = null;
            state.tokenExpiration = null;
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("tokenExpiration");
        },
        SET_DATA_COACHES(state, coaches) {
            state.coaches = coaches;
        },
        SET_DATA_REQUESTS(state, requests) {
            state.requests = requests;
        },
        SET_FILTER_OPTION(state, options) {
            state.filterOption = options;
        },
        SET_STATE_LOADING(state, value) {
            state.loading = value;
        },
        SET_STATE_BACKDROP(state, value) {
            state.backdrop = value;
        },
        SET_STATE_LOGIN(state, value) {
            state.login = value;
        }
    },
    actions: {
        sendRequest(context, data) {
            DB_REQUESTS.child(data.id).push(data.request, error => {
                if (error) {
                    console.log("Send request failed... ", error);
                }
            });
            router.push("/coaches");
        },

        registerAsCoach({ state }, coach) {
            DB_COACHES.child(state.userId).set(coach, error => {
                if (error) {
                    console.log("Register as coach failed... ", error);
                }
            });
            router.push("/coaches");
        },

        getAllCoach({ commit }) {
            commit("SET_STATE_LOADING", true);
            axios
                .get(
                    "https://find-your-coach-d614f-default-rtdb.firebaseio.com/coaches.json"
                )
                .then(response => {
                    let allCoach = [];
                    if (response.data) {
                        Object.keys(response.data).forEach(key => {
                            allCoach.push({ id: key, ...response.data[key] });
                        });
                    }
                    commit("SET_DATA_COACHES", allCoach);
                    commit("SET_STATE_LOADING", false);
                })
                .catch(error => {
                    commit("SET_STATE_LOADING", false);
                    console.log(error);
                });
        },

        getAllRequest({ state, commit }) {
            commit("SET_STATE_LOADING", true);
            axios
                .get(
                    "https://find-your-coach-d614f-default-rtdb.firebaseio.com/requests/" +
                        state.userId +
                        ".json"
                )
                .then(response => {
                    let allRequest = [];
                    if (response.data) {
                        Object.keys(response.data).forEach(key => {
                            allRequest.push({ ...response.data[key] });
                        });
                    }
                    commit("SET_DATA_REQUESTS", allRequest);
                    setTimeout(() => {
                        commit("SET_STATE_LOADING", false);
                    }, 500);
                })
                .catch(error => {
                    setTimeout(() => {
                        commit("SET_STATE_LOADING", false);
                    }, 500);
                    console.log(error);
                });
        },

        async login({ commit, getters }, formData) {
            commit("SET_STATE_BACKDROP", true);
            commit("SET_STATE_LOADING", true);
            try {
                const res = await axios.post(API_LOGIN, {
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true
                });

                commit("SET_STATE_BACKDROP", false);
                commit("SET_STATE_LOADING", false);
                commit("SET_AUTH_USER", {
                    token: res.data.idToken,
                    userId: res.data.localId,
                    expiresIn: res.data.expiresIn
                });
                if (
                    formData.query.redirect == "register" &&
                    !getters.isRegistered
                ) {
                    router.push("/register");
                } else {
                    router.push("/coaches");
                }
            } catch (error) {
                commit("SET_STATE_LOADING", false);
                commit("SET_STATE_LOGIN", false);
                console.log("Lỗi: ", error);
            }
        },

        async signup({ commit, getters }, formData) {
            commit("SET_STATE_BACKDROP", true);
            commit("SET_STATE_LOADING", true);
            try {
                const res = await axios.post(API_SIGNUP, {
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true
                });
                commit("SET_STATE_BACKDROP", false);
                commit("SET_STATE_LOADING", false);
                commit("SET_AUTH_USER", {
                    token: res.data.idToken,
                    userId: res.data.localId,
                    expiresIn: res.data.expiresIn
                });
                if (
                    formData.query.redirect == "register" &&
                    !getters.isRegistered
                ) {
                    router.push("/register");
                } else {
                    router.push("/coaches");
                }
            } catch (error) {
                commit("SET_STATE_LOADING", false);
                commit("SET_STATE_LOGIN", false);
                console.log("Lỗi : " + error);
            }
        },

        logout({ commit }) {
            commit("CLEAR_AUTH_USER");
            router.push("/coaches");
        }
    }
});

export default store;