export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.UserId;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
