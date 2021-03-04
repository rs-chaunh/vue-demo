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
    },
    getters: {

    },
    mutations: {
        SET_LOADING_COACH(state, loading) {
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
    },
    actions: {
        // GET DATA COACHES DEFAUT FROM API
        getDefaultData({
            commit
        }) {
            axios
                .get(`${firebase.API_DATA_JSON}/coaches.json`)
                .then((res) => {
                    commit('SET_DEFAULT_DATA', res.data);
                    commit('SET_TEMP_DATA', res.data)
                    commit('SET_LOADING_COACH', false);
                }).catch(err => console.log(err));
        },
        getDataDetail({
            commit
        }, payLoad) {
            axios
                .get(`${firebase.API_DATA_JSON}/coaches/${payLoad.id}.json`)
                .then((res) => {
                    commit('SET_DATA_DETAIL', res.data);
                }).catch(err => console.log(err));
        }, // GET DATA TEMP TO SS WITH FILTER
        getDatafilter(store, payLoad) {
            // console.log(store);
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
        
    },
}

export default coach