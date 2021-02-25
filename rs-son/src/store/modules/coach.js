import axios from "axios";
import * as firebase from '../../env'

const coach = {
    namespaced: true,
    state: {
        areas: ["frontend", "backend", "career"],
        coaches: [],
        coachesTemp: [],
        dataDetail: [],
        loading: false,
        // locale: localStorage.getItem("lang") ? localStorage.getItem("lang") : "gb",
    },
    getters: {

    },
    mutations: {
        SET_LOCALE(state, locale) {
            return state.locale = locale
        },
        SET_LOADING(state, loading) {
            return state.loading = loading;
        },
        SET_DEFAULT_DATA(state, coaches) {
            return state.coaches = coaches;
        },
        SET_TEMP_DATA(state, coachesTemp) {
            return state.coachesTemp = coachesTemp;
        },
        SET_DATA_FILTER(state, areas) {
            return state.areas = areas;
        },
        SET_DATA_DETAIL(state, dataDetail) {
            return state.dataDetail = dataDetail;
        },
        SET_DATA_REQUEST(state, request) {
            return state.request = request;
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
        }, // GET DATA TEMP TO SS WITH FILTER
        getDatafilter(store, payLoad) {
            console.log(store);
            store.commit('SET_DATA_FILTER', payLoad.listFilter)
            let temp = Object.values(store.state.coachesTemp).filter((item) => {
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
        // GET DATA REQUEST FOR MEM FROM API
        getDataRequest(store) {
            let userId = store.state.tokenId.localId;
            axios
                .get(`${firebase.API_DATA_JSON}/request/${userId}.json`)
                .then((res) => {
                    store.commit('SET_DATA_REQUEST', res.data);
                    store.commit('SET_LOADING', false);
                    console.log(res.data);
                }).catch(err => console.log(err));
        },
    },
}

export default coach