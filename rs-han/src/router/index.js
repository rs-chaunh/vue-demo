import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [
  {
    path: '/',
    redirect: '/coaches',
  },
  {
    path: '/coaches',
    name: 'Coaches',
    component: () => import('../components/coaches/MyCoaches'),
  },
  {
    path: '/coaches/:id',
    name: 'ViewDetail',
    component: () => import('../views/ViewDetail'),
  },
  {
    path: '/coaches/:id/contact',
    name: 'ContactCoach',
    component: () => import('../views/ContactCoach'),
  },
  //TODO không nên tạo route mới kiểu này, mà nên sử dụng thẻ children vì có /coaches/:id giống nhau. Sau này nếu coaches sửa thành coach chẳng hạn, thì chỉ cần sửa 1 chỗ
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../components/auth/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/coaches/CoachesRegister'),
    beforeEnter: (to, from, next) => {
      if (store.state.auth != null) {
        next();
      } else {
        next('/auth');
      }
    },
    //TODO nên viết 1 function chung, rồi ở beforeEnter gọi lại nó, chứ ko nên viết trực tiếp ở đây, vì có thể sẽ có nhiều trang sẽ check tương tự, và clean code hơn
  },
  {
    path: '/request',
    name: 'CoachesRequest',
    component: () => import('../components/request/CoachesRequest'),
  },
  {
    path: '/:pathMath(.*)*',
    name: 'FileNotFound',
    component: () => import('../views/FileNotFound'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
