export default {
  user: (state) => state.user,
  token: (state) => state.token,
  isAuth: (state) => !!state.token,

  isCoach: (_, getters, _2, rootGetters) => {
    return rootGetters["coaches/allCoaches"].some(
      (coach) => coach.id === getters.user
    );
  },

  getLanguages: (state) => state.language,
};
