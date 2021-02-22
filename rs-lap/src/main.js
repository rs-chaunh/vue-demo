import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/router"
import store from "./store/store"
import i18n from "./i18n"

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(store)
app.mount("#app")
