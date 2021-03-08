import axios from "axios";
import * as firebase_API from '../../env'
import firebase from "firebase/app"

const auth = {
    namespaced: true,
    state: {
        tokenId: JSON.parse(localStorage.getItem('checkLogin')),
        linkTo: '/coaches',
        status: '',
        request: [],
        checkLogin: true,
        loading: false,
        locale: localStorage.getItem("lang") ? localStorage.getItem("lang") : "gb",
        isNotification: false
    },
    getters: {
        getLinkTo: (state) => {
            if (state.tokenId != null && state.tokenId != '') {
                state.linkTo = '/register'
            } else {
                state.linkTo = {
                    path: '/auth',
                    query: {
                        redirect: 'register'
                    },
                    name: 'Auth'
                }
            }
            return state.linkTo;
        },
    },
    mutations: {
        SET_LOCALE(state, locale) {
            return state.locale = locale
        },
        SET_LOADING(state, loading) {
            return state.loading = loading;
        },
        SET_RESULT_POST(state, status) {
            return state.status = status;
        },
        SET_CHECK_LOGIN(state, checkLogin) {
            return state.checkLogin = checkLogin;
        },
        SET_TOKEN_ID(state, tokenId) {
            return state.tokenId = tokenId;
        },
        SET_DATA_REQUEST(state, request) {
            return state.request = request;
        },
        SET_NOTIFICATION(state, isNotification) {
            return state.isNotification = isNotification;
        },
    },

    actions: {
        // HANDLE REGISTER COACH
        handlePostDataCoach({
            commit
        }, payLoad) {
            axios.put(`${firebase_API.API_DATA_JSON}/coaches/${payLoad.user.localId}.json?auth=${payLoad.user.idToken}`, payLoad.data).then((res) => {
                console.log('POST CORRECTED');
                commit('SET_RESULT_POST', res.data);
            }).catch(err => {
                console.log('POST FAILSE');
                commit('SET_RESULT_POST', err.message)
            })
        },
        // HANDLE POST REQUEST FROM USER
        handlePostDataRequest(store, payLoad) {
            axios.post(`${firebase_API.API_DATA_JSON}/request/${payLoad.requestId}.json`, payLoad.data).then((res) => {
                console.log('POST REQUESTS CORRECTED');
                console.log(res);
            }).catch(err => {
                console.log('POST REQUESTS FAILSE');
                console.log(err);
            })
        },
        // HANDLE SIGN FOR USER
        async handleSignUp({
            commit
        }, payLoad) {
            commit('SET_LOADING', true);
            setTimeout(() => {
                commit('SET_LOADING', false);
            }, 500)
            try {
                let res = await axios.post(`${firebase_API.API_AUTH}:signUp?key=${firebase_API.API_KEY}`, payLoad.data);
                commit('SET_LOADING', false);
                commit('SET_TOKEN_ID', res.data);
                const db = firebase.firestore();
                db.collection("user").add({
                    token: payLoad.token,
                    idCoachLogin: res.data.localId,
                });
                localStorage.setItem("checkLogin", JSON.stringify(res.data));
                localStorage.setItem("userId", JSON.stringify(res.data));
                return true
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        // HANDLE LOGIN FOR MEM
        async handleLogin({
            commit,
            // state
        }, payLoad) {
            commit('SET_LOADING', true);
            setTimeout(() => {
                commit('SET_LOADING', false);
            }, 500)
            try {
                let res = await axios.post(`${firebase_API.API_AUTH}:signInWithPassword?key=${firebase_API.API_KEY}`, payLoad.data)
                let checkLogin = {
                    idToken: res.data.idToken,
                    localId: res.data.localId,
                    email: res.data.email,
                };
                const db = firebase.firestore();
                db.collection("user").add({
                    token: payLoad.token,
                    idCoachLogin: res.data.localId,
                });
                commit('SET_TOKEN_ID', checkLogin);
                localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        // GET DATA REQUEST FOR MEM FROM API
        // TODO đây là context chứ ko phải store nhé, em console ra để xem nó khác nhau gì, tương tự những chỗ khác
        // https://vuex.vuejs.org/guide/actions.html
        // TODO nếu đã set loading false ở đây, thì set loading true ở đây luôn, thường thì a ko lưu loading trong state, lưu trnog data của component là được rồi
        getDataRequest(store) {
            let userId = store.state.tokenId.localId;
            axios
                .get(`${firebase_API.API_DATA_JSON}/request/${userId}.json`)
                .then((res) => {
                    store.commit('SET_DATA_REQUEST', res.data);
                    store.commit('SET_LOADING', false);
                }).catch((err) => {
                    console.log(err);
                    store.commit('SET_LOADING', false);
                })
        },
    }
}

export default auth