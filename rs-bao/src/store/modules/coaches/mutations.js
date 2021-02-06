export default {
  setCoaches: (state, payload) => {
    state.coaches = payload;
  },

  registerCoaches: (state, payload) => {
    state.coaches.push(payload);
  },
};
