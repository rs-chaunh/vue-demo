export default {
  user: (state) => state.user,
  token: (state) => state.token,
  isLogin: (state) => !!state.token,

  isCoach: (_, getters, _2, rootGetters) => {
    return rootGetters["coaches/allCoaches"].some(
      (coach) => coach.id === getters.user
    );
  },
};
