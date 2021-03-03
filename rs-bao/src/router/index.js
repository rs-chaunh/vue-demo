import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

const routes = [
  { path: "/", redirect: "/coaches" },
  {
    path: "/coaches",
    name: "Coaches",
    component: () =>
      import(/* webpackChunkName: "Coaches" */ "../views/coaches/Coaches.vue"), //TODO mục đích để chữ webpackChunkName là gì
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
    name: "register", //TODO name chỗ viết hoa chỗ không, sửa lại cho đồng bộ
    component: () =>
      import(
        /* webpackChunkName: "CoachCreate" */ "../views/coaches/CoachCreate.vue"
      ),
    meta: { requiresAuth: true }, //TODO requiresAuth là động từ, sửa lại là danh từ authRequired
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "../views/auth/Auth.vue"),
    meta: { requiresUnauth: true }, //TODO tương tự phía trên
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
  if (to.meta.requiresAuth && !store.getters["auth/isLogin"]) {
    next("/auth"); 
  } else if (to.meta.requiresUnauth && store.getters["auth/isLogin"]) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
