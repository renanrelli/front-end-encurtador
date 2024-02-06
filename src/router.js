import { createRouter, createWebHistory } from "vue-router";
const UserAuth = () => import("./pages/auth/UserAuth.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/auth", component: UserAuth }],
});

export default router;
