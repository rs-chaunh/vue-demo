
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

