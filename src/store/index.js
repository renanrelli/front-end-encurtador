import { createStore } from "vuex";
import authModule from "./modules/auth/index.js";
import linksModule from "./modules/links/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    links: linksModule,
  },
});

export default store;
