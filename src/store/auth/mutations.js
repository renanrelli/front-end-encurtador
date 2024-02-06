export default {
  setUser(state, payload) {
    if (payload !== null) {
      state.token = payload.token;
    }
  },
};
