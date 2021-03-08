import {
  createRouter,
  createWebHistory
} from 'vue-router';
import store from '../store/index';

//TODO coaches/:id, coaches/:id/xxx là nested route, nên sử dụng thuộc tính children
// https://router.vuejs.org/guide/essentials/nested-routes.html

const routes = [
  {
    path: '/',
    redirect: {
      path: '/coaches',
      name: 'Coaches',
    }, //TODO redirect thì theo path hoặc theo name thôi, name là đại diện cho path, phòng trường hợp sau này path có thay đổi
  },
  {
    path: '/coaches',
    name: 'Coaches',
    component: () =>
    import('../views/Coach.vue'), //FIXED
  },
  {
    path: '/auth',
    query: {
      redirect: 'register',
    },
    name: 'Auth',
    component: () =>
      import('../views/Auth.vue'),
  },
  {
    path: '/coaches/:id/contact',
    name: 'Contact',
    component: () =>
      import('../views/Contact.vue'),
  },
  {
    path: '/register',
    name: 'RegisterCoach',
    beforeEnter: (to, from, next) => {
      let indexOfCoach = localStorage.getItem('checkCoach');
      if (store.state.auth.tokenId != null) {
        if (indexOfCoach > 0) {
          //FIXED
          next('/coaches'); //TODO navigate thì ưu tiên dùng name hơn là dùng path, vì path có thể bị thay đổi, nhưng name thì ko
        } else {
          next();
        }
      } else {
        next('/auth');
      }
    }, //TODO nên định nghĩa function này phía dưới, rồi ở beforeEnter gắn function đó vào thôi, clean và có thể tái sử dụng
    component: () => import('../views/RegisterCoach.vue'),
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () =>
      import('../views/Detail.vue'),
  },
  {
    path: '/requests',
    name: 'Request',
    component: () =>
      import('../views/Request.vue'),
  },
  {
    path: '/:NotFound(.*)*',
    component: () =>
      import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), //TODO em định nghĩa BASE_URL ở đâu a ko thấy
  routes,
});

export default router;