import {
  createRouter,
  createWebHistory
} from 'vue-router';
import store from '../store/index';


const routes = [{
    path: '/',
    redirect: {
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
      next(isCoach())
    },
    component: () => import('../views/RegisterCoach.vue'),
  },
  {
    path: '/coach/:id',
    name: 'Detail',
    component: () =>
      import('../views/DetailCoach.vue'),
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

const isCoach = function () {
  let indexOfCoach = localStorage.getItem('checkCoach');
  if (store.state.auth.tokenId != null) {
    if (indexOfCoach != -1) {
      return 'Coaches'
    } else {
      return ''
    }
  } else {
    return 'Auth'
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;