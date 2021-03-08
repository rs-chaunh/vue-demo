import axios from "axios";
// import * as firebase from '../../env'

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
        getDatafilter :(state) => (listFilter) => {
            let temp = Object.values(state.coachesTemp).filter((item) => {
                let check;
                listFilter.forEach(elm => {
                    if (item.areas.indexOf(elm) != -1) {
                        check = true
                    }
                })
                return check;
            })
            state.coaches = temp;
        },
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
        getCoaches({
            commit
        }) {
            commit('SET_LOADING_COACH', true);
            axios
                .get(`${process.env.VUE_APP_API_DATA_JSON}/coaches.json`)
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
                .get(`${process.env.VUE_APP_API_DATA_JSON}/coaches/${payLoad.id}.json`)
                .then((res) => {
                    commit('SET_DATA_DETAIL', res.data);
                }).catch(err => console.log(err));
        }, // GET DATA TEMP TO SS WITH FILTER
    },
}

export default coach