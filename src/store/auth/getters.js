export default {
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    console.log(state.token);
    return !!state.token;
  },
};
