import {
  createStore
} from 'vuex'
import firebase from "firebase/app";

import axios from "axios";

export default createStore({
  state: {
    areas: ["frontend", "backend", "career"],
    coaches: [],
    temp: [],
    dataDetail: [],
    tokenId: JSON.parse(localStorage.getItem('checkLogin')),
    linkTo: '/coaches',
    status: '',
    request: [],
    checkLogin: true,
    loading: false,
    locale : localStorage.getItem("lang") ? localStorage.getItem("lang") : "gb",
    isNotification : false
  },
  getters: {
    getTokenId: (state) => {
      return state.tokenId;
    },
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
    SET_LOCALE(state,locale) {
      // console.log(locale);
      return state.locale = locale
    }
    ,
    SET_DEFAULT_DATA(state, coaches) {
      return state.coaches = coaches;
    },
    SET_TEMP_DATA(state, temp) {
      return state.temp = temp;
    },
    SET_DATA_FILTER(state, areas) {
      return state.areas = areas;
    },
    SET_DATA_REQUEST(state, request) {
      return state.request = request;
    },
    SET_DATA_DETAIL(state, dataDetail) {
      return state.dataDetail = dataDetail;
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
    SET_LOADING(state, loading) {
      return state.loading = loading;
    },
    SET_NOTIFICATION(state, isNotification) {
      return state.isNotification = isNotification;
    },
  },
  actions: {
    // GET DATA COACHES DEFAUT FROM API
    getDefaultData({
      commit
    }) {
      axios
        .get("https://coaches-project-8d77f-default-rtdb.firebaseio.com/coaches.json")
        .then((res) => {
          commit('SET_DEFAULT_DATA', res.data);
          commit('SET_TEMP_DATA', res.data)
          commit('SET_LOADING', false);
        }).catch(err => console.log(err));
    },
    getDataDetail({
      commit
    }, payLoad) {
      axios
        .get(payLoad.url)
        .then((res) => {
          commit('SET_DATA_DETAIL', res.data);
        }).catch(err => console.log(err));
    },
    // GET DATA REQUEST FOR MEM FROM API
    getDataRequest(store) {
      let userId = store.state.tokenId.localId;
      axios
        .get(`https://coaches-project-8d77f-default-rtdb.firebaseio.com/request/${userId}.json`)
        .then((res) => {
          store.commit('SET_DATA_REQUEST', res.data);
          store.commit('SET_LOADING', false);
        }).catch(err => console.log(err));
    },
    // GET DATA TEMP TO SS WITH FILTER
    getDatafilter(store, payLoad) {
      store.commit('SET_DATA_FILTER', payLoad.listFilter)
      let temp = Object.values(store.state.temp).filter((item) => {
        let check;
        payLoad.listFilter.forEach(elm => {
          if (item.areas.indexOf(elm) != -1) {
            check = true
          }
        })
        return check;
      })
      store.state.coaches = temp;
    },
    // HANDLE REGISTER COACH
    handlePostDataCoach({
      commit
    }, payLoad) {
      axios.put(payLoad.url, payLoad.data).then((res) => {
        console.log('POST CORRECTED');
        commit('SET_RESULT_POST', res.data);
      }).catch(err => {
        console.log('POST FAILSE');
        commit('SET_RESULT_POST', err.message)
      })
    },
    // HANDLE POST REQUEST FROM USER
    handlePostDataRequest(store, payLoad) {
      axios.post(payLoad.url, payLoad.data).then((res) => {
        console.log('POST REQUESTS CORRECTED');
        console.log(res);
      }).catch(err => {
        console.log('POST REQUESTS FAILSE');
        console.log(err);
      })
    },
    // HANDLE SIGN FOR USER
    handleSignUp({
      commit
    }, payLoad) {
      commit('SET_LOADING', true);
      setTimeout(() => {
        commit('SET_LOADING', false);
      }, 500)
      axios.post(payLoad.url, payLoad.data).then(res => {
        console.log('SignUp CORRECTED');
        commit('SET_LOADING', false);
        commit('SET_TOKEN_ID', res.data);
        const db = firebase.firestore();
        db.collection("user").add({
          token: payLoad.token,
          idCoachLogin: res.data.localId,
        });
        localStorage.setItem("checkLogin", JSON.stringify(res.data));
        if (payLoad.route.query.redirect) {
          payLoad.router.push({
            path: "/register"
          });
        } else {
          payLoad.router.push({
            path: "/coaches"
          });
        }
        localStorage.setItem("userId", JSON.stringify(res.data));
      }).catch(err => {
        console.log(err);
        commit('SET_CHECK_LOGIN', false);
      })
    },
    // HANDLE LOGIN FOR MEM
    handleLogin({
      commit,
      state
    }, payLoad) {
      commit('SET_LOADING', true);
      setTimeout(() => {
        commit('SET_LOADING', false);
      }, 500)
      axios.post(payLoad.url, payLoad.data).then(res => {
        console.log("LOGIN CORRECTED");
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
        localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
        commit('SET_TOKEN_ID', checkLogin);
        // CHECK LINK TO LOGIN OR REGISTER
        let arr = state.temp;
        let userId = state.tokenId;
        let index = -1;
        if (userId != null && arr != null) {
          index = Object.keys(arr).findIndex((item) => item == userId.localId);
        }
        // DON'T TO REGISTER PAGE IF HAVE ACCOUNT
        if (payLoad.route.query.redirect && index == -1) {
          payLoad.router.push({
            path: "/register"
          });
        } else {
          payLoad.router.push({
            path: "/coaches"
          });
        }
      }).catch(err => {
        commit('SET_CHECK_LOGIN', false);
        console.log(err);
      })
    },
  },
})