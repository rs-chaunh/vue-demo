import { createWebHistory, createRouter } from "vue-router";
import store from "../stores";

function authenticated(to, from, next) {
  if (to.path === "/auth") {
    if (store.getters.isAuthenticated) {
      router.push({ name: "Coaches" });
    } else next();
  } else {
    if (!store.getters.isAuthenticated) {
      router.push({ name: "Auth" });
    } else next();
  }
}

const routes = [
  {
    path: "/",
    redirect: "/coaches",
  },
  {
    path: "/coaches",
    name: "Coaches",
    component: () => import("../components/CoachesPage.vue"),
  },
  {
    path: "/coaches/:id",
    name: "CoachesDetail",
    component: () => import("../components/CoachesDetailPage.vue"),
    children: [
      {
        path: "contact",
        name: "CoachesDetailContact",
        component: () => import("../components/CoachesDetailContactPage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../components/AuthPage.vue"),
    beforeEnter: authenticated,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../components/RegisterPage.vue"),
    beforeEnter: authenticated,
  },
  {
    path: "/requests",
    name: "Requests",
    component: () => import("../components/RequestsPage.vue"),
    beforeEnter: authenticated,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../components/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
