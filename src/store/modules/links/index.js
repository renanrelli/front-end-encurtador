import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state() {
    return {
      arrayLinks: [],
      stats: {
        totalViews: null,
        linksQuantity: null,
      },
    };
  },
  mutations,
  actions,
  getters,
};
