import { createApp } from "vue";
import "./scss/main.scss";
import store from "./store/index.js";
import router from "./router.js";
import App from "./App.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-spinner", BaseSpinner);

app.mount("#app");
