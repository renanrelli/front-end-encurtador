import { createRouter, createWebHistory } from "vue-router";
const UserAuth = () => import("./pages/auth/UserAuth.vue");
const Home = () => import("./pages/home/Home.vue");
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      component: UserAuth,
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    console.log(store.getters.isAuthenticated);
    next("/auth");
  } else {
    next();
  }
});

export default router;
