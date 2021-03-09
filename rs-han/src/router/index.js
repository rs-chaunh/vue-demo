import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/coaches",
  },
  {
    path: "/coaches",
    name: "Coaches",
    component: () => import("../views/CoachesPage"),
  },
  {
    path: "/coaches/:id",
    name: "ViewDetailCoaches",
    component: () => import("../views/ViewDetailCoaches"),
  },
  {
    path: "/coaches/:id/contact",
    name: "ContactCoach",
    component: () => import("../views/ContactCoach"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../components/auth/Login"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/coaches/CoachesRegister"),
    beforeEnter: (to, from, next) => {
      checkIsLogin(next);
    },
  },
  {
    path: "/request",
    name: "CoachesRequest",
    component: () => import("../components/request/CoachesRequest"),
  },
  {
    path: "/:pathMath(.*)*",
    name: "FileNotFound",
    component: () => import("../views/FileNotFound"),
  },
];

function checkIsLogin(next) {
  if (store.state.auth.auth != null) {
    next();
  } else {
    next("/auth");
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
