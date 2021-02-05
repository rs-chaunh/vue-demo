import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

const routes = [{
    path: '/',
    redirect: {
      path: '/coaches',
      name: 'Coaches'
    }
  }, {
    path: '/coaches',
    name: 'Coaches',
    component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue'),
    components: {
      default: Home,
    },
    // children: [{
    //   path: '/coaches/:id',
    //   name: 'Detail',
    //   component: () => import( /* webpackChunkName: "about" */ '../views/Detail.vue'),
    // }]
  },
  {
    path: '/auth',
    query: {
      redirect: 'register'
    },
    name: 'Auth',
    component: () => import( /* webpackChunkName: "about" */ '../views/Auth.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import( /* webpackChunkName: "about" */ '../views/Auth.vue')
  },
  {
    path: '/coaches/:id/contact',
    name: 'Contact',
    component: () => import( /* webpackChunkName: "about" */ '../views/Contact.vue')
  },
  {
    path: '/register',
    name: 'RegisterCoach',
    beforeEnter: (to, from, next) => {
      let checkCoach = localStorage.getItem('checkCoach');
      if (store.state.tokenId != null) {
        if (checkCoach > 0 ) {
          next('/coaches');
        } else {
          next()
        }
      } else {
        next('/auth');
      }
    },
    component: () => import( /* webpackChunkName: "about" */ '../views/RegisterCoach.vue'),
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import( /* webpackChunkName: "about" */ '../views/Detail.vue')
  },
  {
    path: '/requests',
    name: 'Request',
    component: () => import( /* webpackChunkName: "about" */ '../views/Request.vue')
  },
  {
    path: '/:NotFound(.*)*',
    component: () => import( /* webpackChunkName: "about" */ '../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router