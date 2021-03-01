export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.user = payload.user;
  },

  setLanguage: (state, payload) => (state.language = payload),
};
