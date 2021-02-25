import axios from "axios";
import * as firebase from '../../env'

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

    },

    actions: {
        // HANDLE REGISTER COACH
        handlePostDataCoach({
            commit
        }, payLoad) {
            axios.put(`${firebase.API_DATA_JSON}/coaches/${payLoad.user.localId}.json?auth=${payLoad.user.idToken}`, payLoad.data).then((res) => {
                console.log('POST CORRECTED');
                commit('SET_RESULT_POST', res.data);
            }).catch(err => {
                console.log('POST FAILSE');
                commit('SET_RESULT_POST', err.message)
            })
        },
        // HANDLE POST REQUEST FROM USER
        handlePostDataRequest(store, payLoad) {
            axios.post(`${firebase.API_DATA_JSON}/request/${payLoad.requestId}.json`, payLoad.data).then((res) => {
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
                let res = await axios.post(`${firebase.API_AUTH}:signUp?key=${firebase.API_KEY}`, payLoad.data);
                commit('SET_LOADING', false);
                commit('SET_TOKEN_ID', res.data);
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
                let res = await axios.post(`${firebase.API_AUTH}:signInWithPassword?key=${firebase.API_KEY}`, payLoad.data)
                let checkLogin = {
                    idToken: res.data.idToken,
                    localId: res.data.localId,
                    email: res.data.email,
                };
                commit('SET_TOKEN_ID', checkLogin);
                localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    }
}

export default auth