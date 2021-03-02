const state = {
  isError: false,
};

const getters = {
    isError: (state) => state.isError
}

const mutations = {
  SET_IS_ERROR(state, status) {
    state.isError = status;
  },
};

export default { state, getters, mutations };
