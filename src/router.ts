// router.ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/index.vue";
import getPage from "./pages/get.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/get", name: "get", component: getPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
