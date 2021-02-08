import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

const routes = [
  { path: "/", redirect: "/coaches" },
  {
    path: "/coaches",
    name: "Coaches",
    component: () =>
      import(/* webpackChunkName: "Coaches" */ "../views/coaches/Coaches.vue"),
  },
  {
    path: "/coaches/:id",
    name: "CoachDetail",
    component: () =>
      import(
        /* webpackChunkName: "CoachDetail" */ "../views/coaches/CoachDetail.vue"
      ),
    props: true,
    children: [
      {
        path: "contact",
        name: "CoachContact",
        component: () =>
          import(
            /* webpackChunkName: "CoachContact" */ "../views/requests/CoachContact.vue"
          ),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "CoachCreate" */ "../views/coaches/CoachCreate.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "../views/auth/Auth.vue"),
    meta: { requiresUnauth: true },
  },
  {
    path: "/requests",
    name: "Requests",
    component: () =>
      import(
        /* webpackChunkName: "CoachRequestsReceived" */ "../views/requests/CoachRequestsReceived.vue"
      ),
  },

  {
    path: "/:NotFound(.*)*",
    name: "PageNotFound",
    component: () =>
      import(
        /* webpackChunkName: "PageNotFound" */ "../components/layouts/PageNotFound.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//guard navigation
router.beforeEach((to, _, next) => {
  // if (to.matched.some((record) => record.meta.authRequired)) {
  //   if (!store.state.user && !!store.state.token) {
  //     next({
  //       name: "Auth",
  //     });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  if (to.meta.requiresAuth && !store.getters["auth/isLogin"]) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters["auth/isLogin"]) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
