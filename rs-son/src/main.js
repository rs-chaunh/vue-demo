import {
    createApp
} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import FlagIcon from 'vue-flag-icon'
import i18n from './plugins/i18n'

const app = createApp(App);


app.use(store)
app.use(router)
app.use(i18n)
app.use(FlagIcon)
app.mount('#app')