//TODO tách riêng làm 2 module: auth, coach, sử dụng namespaced
import {
  createStore
} from 'vuex'
import auth from './modules/auth'
import coach from './modules/coach'

const store = createStore({
  modules: {
    auth: auth,
    coach: coach
  },
})

export default store

