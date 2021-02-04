const state = {
    isLoading: null
};

const getters = {
    getIsLoading: state => state.isLoading 
};

const mutations = {
    SET_IS_LOADING(state, status) {
        state.isLoading = status;
    }
};

const actions = {};

export default { state, getters, mutations, actions }