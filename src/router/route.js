import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: () => import("../views/Home.vue") },
  { path: "/result", name: "Result", component: () => import("../views/Result.vue") },
  {
    path: "/*",
    component: () => import("../views/Home.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
