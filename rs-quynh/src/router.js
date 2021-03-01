import { createWebHistory, createRouter } from "vue-router";
import store from "./stores"
const routes = [
  {
    path: "/",
    redirect: "/coaches",
  },
  {
    path: "/coaches",
    name: "Coaches",
    component: () => import("./components/CoachesPage.vue"),
  },
  {
    path: "/coaches/:id",
    name: "CoachesDetail",
    component: () => import("./components/CoachesDetailPage.vue"),
    children: [
      {
        path: "contact",
        name: "CoachesDetailContact",
        component: () => import("./components/CoachesDetailContactPage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("./components/AuthPage.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        router.push({ name: "Coaches" });
      } else next();
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./components/RegisterPage.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        router.push({ name: "Auth" });
      } else next();
    },
  },
  {
    path: "/requests",
    name: "Requests",
    component: () => import("./components/RequestsPage.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        router.push({ name: "Auth" });
      } else next();
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./components/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
