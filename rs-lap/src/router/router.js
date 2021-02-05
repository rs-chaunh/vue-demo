import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

const routes = [
    {
        path: "/",
        redirect: "/coaches"
    },
    {
        path: "/:pathMath(.*)*",
        name: "NotFound",
        component: () =>
            import("../components/pages/PageNotFound/PageNotFound"),
        meta: { title: "Page Not Found" }
    },
    {
        path: "/coaches",
        name: "Coaches",
        component: () => import("../components/pages/CoachesPage/Coaches"),
        meta: { title: "Home" }
    },
    {
        path: "/requests",
        name: "Requests",
        component: () => import("../components/pages/RequestsPage/Requests"),
        meta: { title: "Requests" },
        beforeEnter: (to, from, next) => {
            if (!store.getters.isAuthenticated) {
                next("/auth");
            } else next();
        }
    },
    {
        path: "/register",
        name: "RegisterAsCoach",
        component: () =>
            import("../components/pages/RegisterPage/RegisterAsCoach"),
        meta: { title: "Register As Coach" },
        beforeEnter: (to, from, next) => {
            if (!store.getters.isAuthenticated) {
                next("/auth");
            } else if (store.getters.isRegistered) {
                next("/coaches");
            } else next();
        }
    },
    {
        path: "/coaches/:id",
        name: "CoachItemDetails",
        component: () =>
            import("../components/pages/CoachesPage/CoachItemDetails"),
        meta: { title: "Coach" },
        children: [
            {
                path: "contact",
                name: "CoachContact",
                component: () =>
                    import("../components/pages/CoachesPage/CoachContactForm"),
                meta: { title: "Contact" }
            }
        ]
    },
    {
        path: "/auth",
        name: "Auth",
        component: () => import("../components/pages/AuthPage/Auth"),
        meta: { title: "Auth" },
        beforeEnter: (to, from, next) => {
            if (store.getters.isAuthenticated) {
                router.push("/coaches");
            } else next();
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {
    console.log("Chuyển trang từ: " + from.path + " đến: " + to.path);
});
export default router;
