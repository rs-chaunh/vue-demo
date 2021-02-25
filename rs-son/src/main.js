import {
    createApp
} from 'vue'
import FlagIcon from 'vue-flag-icon' //FIXED

import './registerServiceWorker'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './plugins/i18n'

import ItemButton from "./components/Common/ItemButton";
import ItemPopUp from "./components/Common/ItemPopUp";
import ItemModal from "./components/Common/ItemModal";
import ItemLazyLoad from "./components/Common/ItemLazyLoad";
import ItemCard from "./components/Common/ItemCard";

const app = createApp(App);


app.component('ItemButton', ItemButton)
app.component('ItemPopUp', ItemPopUp)
app.component('ItemModal', ItemModal)
app.component('ItemLazyLoad', ItemLazyLoad)
app.component('ItemCard', ItemCard)

app.use(store)
app.use(router)
app.use(i18n)
app.use(FlagIcon)
app.mount('#app')