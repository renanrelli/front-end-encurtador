import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state() {
    return {
      token: null,
    };
  },
  mutations,
  actions,
  getters,
};
