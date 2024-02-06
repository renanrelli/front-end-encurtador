import { createApp } from "vue";
import "./scss/main.scss";
import router from "./router.js";
import App from "./App.vue";

const app = createApp(App);

app.use(router);

app.mount("#app");
