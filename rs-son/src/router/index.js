import {
  createRouter,
  createWebHistory
} from 'vue-router';
import store from '../store/index';

const routes = [{
    path: '/',
    redirect: {
      path: '/coaches',
      name: 'Coaches',
    },
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
        if (indexOfCoach > 0) { //FIXED
          next('/coaches');
        } else {
          next();
        }
      } else {
        next('/auth');
      }
    },
    component: () =>
      import('../views/RegisterCoach.vue'),
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;