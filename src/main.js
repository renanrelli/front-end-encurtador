import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import "./scss/main.scss";
import store from "./store/index.js";
import router from "./router.js";
import vClickOutside from "v-click-outside";
import App from "./App.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

library.add(fas, fab);

const app = createApp(App);

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});
app.use(vClickOutside);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);

app.component("base-spinner", BaseSpinner);

app.mount("#app");
