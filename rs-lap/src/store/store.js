import { createStore } from "vuex";
import axios from "axios";
import router from "../router/router";
import firebase from "../firebase/firebaseConfig";
import "firebase/messaging";

const DB_REQUESTS = firebase.database().ref("/requests");
const MESSAGING = firebase.messaging();
const API_DATABASE =
    "https://find-your-coach-d614f-default-rtdb.firebaseio.com";
const API_LOGIN =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBviMPpTk73p83yhE6hW7swWQ7YZNOYGC8";
const API_SIGNUP =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBviMPpTk73p83yhE6hW7swWQ7YZNOYGC8";
const VAPIDKEY = "BEVzrPcAK_h-1f6XoVHFxjN2TBXAoPffKvQW9_dAoymhaBppszoo9n7DoINB1YvDLX_t2m9BCwIms-ypbTt_pMw"

const store = createStore({
    state() {
        return {
            token: localStorage.getItem("token") || null,
            userId: localStorage.getItem("userId") || null,
            tokenExpiration: localStorage.getItem("tokenExpiration") || null,
            tokenDevices: null,
            tokenDevice: localStorage.getItem("tokenDevice") || null,
            coaches: [],
            requests: [],
            filterOption: ["frontend", "backend", "career"],
            lang: JSON.parse(localStorage.getItem("lang")) || {
                content: "English",
                value: "en"
            },
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
            return state.coaches.find(e => e.id == state.userId);
        },
        requestsUnsent(state) {
            return state.requests.filter(e => e.isSent == false);
        }
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
        SET_STATUS_REQUEST(state, requestId) {
            state.requests.map(e => ((e.key == requestId) ? e.isSent = true : e.isSent = false, e));
        },
        REMOVE_TOKEN_DEVICE(state, tokenDevice) {
            var tokens = state.tokenDevices.filter(e => e != tokenDevice);
            state.tokenDevices = tokens;
            localStorage.removeItem("tokenDevice")
        },
        SET_TOKEN_DEVICE(state, tokenDevice) {
            state.tokenDevice = tokenDevice;
        },
        SET_USER_TOKEN_DEVICES(state, tokenDevices) {
            state.tokenDevices = tokenDevices;
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
        },
        SET_STATE_LANG(state, value) {
            state.lang = value;
        }
    },
    actions: {
        setStatusNotification({ state }, payload) {
            axios
                .put(
                    `${API_DATABASE}/requests/${state.userId}/${payload.key}.json`,
                    {
                        email: payload.email,
                        isSent: true,
                        message: payload.message
                    }
                )
                .then()
                .catch(err => {
                    console.log(err);
                });
        },
        sendNotification(context, payload) {
            const data = {
                notification: {
                    title: payload.email,
                    body: payload.message,
                    click_action: "http://localhost:8080/requests",
                    icon:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYWXioShgsa3_D3Oxv7xIsB66yFp6a7XNLA&usqp=CAU"
                },
                data: {
                    title: payload.email,
                    body: payload.message
                },
                to: payload.tokenDevice
            };
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization:
                        "key=AAAALlOaz3E:APA91bHw_Zpkt-Cv2AnnxjcWWXIWeO1yZnATtN9uH5nAndbvoF0CqfQZMO0fDvACguugNj3jUaQfE0p1BLg6Tm4qQ-lk9OdPZEWp1zeokMbQrJsYVUYDWKaT6DFeufQbaf3roa8HEGVN"
                },
                data: JSON.stringify(data),
                url: "https://fcm.googleapis.com/fcm/send"
            };
            axios(options)
                .then(res => console.log(res))
                .catch(e => console.log(e));
        },

        async getUserTokenDevices({ state, commit }) {
            await axios.get(`${API_DATABASE}/coaches/${state.userId}/tokenDevices.json`)
                .then(response => {
                    if (response.data) {
                        const arrTokens = Array.from(response.data);
                        if (arrTokens.indexOf(state.tokenDevice) == -1) {
                            arrTokens.push(state.tokenDevice);
                        }
                        commit("SET_USER_TOKEN_DEVICES", arrTokens);
                    } else {
                        commit("SET_USER_TOKEN_DEVICES", [state.tokenDevice]);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async generateTokenDevice({ commit }) {
            await MESSAGING.getToken({
                vapidKey: VAPIDKEY
            })
            .then(currentToken => {
                if (currentToken) {
                    commit("SET_TOKEN_DEVICE", currentToken);
                    localStorage.setItem("tokenDevice", currentToken);
                } else {
                    console.log("No registration token available. Request permission to generate one.");
                }
            })
            .catch(err => {
                console.log(
                    "An error occurred while retrieving token. ",
                    err
                );
            });
        },

        async updateTokenDevices({ getters, state }, data) {
            if(getters.isRegistered) {
                await axios
                .put(`${API_DATABASE}/coaches/${state.userId}/tokenDevices.json`,data)
                .then(() => {
                    console.log("Update token successfully");
                })
                .catch(err => {
                    console.log(err);
                });
            }
        },

        async sendRequest({  dispatch }, data) {
            var tokens = await axios.get(
                    `${API_DATABASE}/coaches/${data.id}/tokenDevices.json`
                );
                tokens = tokens.data;
                if(tokens) {
                    tokens.forEach(el => {
                        dispatch("sendNotification", {
                            ...data.request,
                            tokenDevice: el
                        });
                    });
                }
            const request = {
                ...data.request,
                isSent: tokens!=null ? true : false
            };
            DB_REQUESTS.child(data.id).push(request, error => {
                if (error) {
                    console.log("Send request failed... ", error);
                }
            });
            router.push("/coaches");
        },

        async registerAsCoach({ dispatch, state }, coach) {
            await axios.put(`https://find-your-coach-d614f-default-rtdb.firebaseio.com/coaches/${state.userId}.json`, coach)
            await dispatch("getAllCoach");
            await dispatch("updateTokenDevices", state.tokenDevices);
            await dispatch("getUserTokenDevices");
            router.push("/coaches");
        },

        async getAllCoach({ commit }) {
            commit("SET_STATE_LOADING", true);
            await axios.get(`${API_DATABASE}/coaches.json`)
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

        async getAllRequest({ state, commit }) {
            commit("SET_STATE_LOADING", true);
            await axios.get(`${API_DATABASE}/requests/${state.userId}.json`)
                .then(response => {
                    let allRequest = [];
                    if (response.data) {
                        Object.keys(response.data).forEach(key => {
                            allRequest.push({
                                key: key,
                                ...response.data[key]
                            });
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

        async login({ dispatch, commit, state, getters }, formData) {
            commit("SET_STATE_BACKDROP", true);
            commit("SET_STATE_LOADING", true);
            try {
                const res = await axios.post(API_LOGIN, {
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true
                });

                commit("SET_AUTH_USER", {
                    token: res.data.idToken,
                    userId: res.data.localId,
                    expiresIn: res.data.expiresIn
                });
                await dispatch("getAllRequest");
                await dispatch("generateTokenDevice");
                await dispatch("getUserTokenDevices");
                if(getters.isRegistered) 
                    await dispatch("updateTokenDevices", state.tokenDevices);

                commit("SET_STATE_BACKDROP", false);
                commit("SET_STATE_LOADING", false);
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
            }
        },

        async signup({ dispatch, commit, getters }, formData) {
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
                await dispatch("generateTokenDevice");
                await dispatch("getUserTokenDevices");
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

        async logout({ dispatch, commit, state }) {
            await dispatch('getUserTokenDevices');
            commit("REMOVE_TOKEN_DEVICE", state.tokenDevice);
            dispatch('updateTokenDevices', state.tokenDevices);
            commit("CLEAR_AUTH_USER");
            router.push("/coaches");
        }
    }
});

export default store;