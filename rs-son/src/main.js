import {
    createApp
} from 'vue'
import FlagIcon from 'vue-flag-icon' //FIXED
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import i18n from './plugins/i18n'
import firebase from './firebase'

import App from './App.vue'
import ItemButton from "./components/Common/ItemButton";
import ItemPopUp from "./components/Common/ItemPopUp";
import ItemModal from "./components/Common/ItemModal";
import ItemLazyLoad from "./components/Common/ItemLazyLoad";
import ItemCard from "./components/Common/ItemCard";
import ItemBadge from "./components/Common/ItemBadge";
import ItemLink from "./components/Common/ItemLink";

// push notification with firestore local
const db = firebase.firestore();
if (location.hostname === "localhost") {
    console.log("localhost");
    db.settings({
        host: "localhost:8080",
        ssl: false,
    });
}

const messaging = firebase.messaging();
messaging.onMessage(() => {
    let CoachLogin = store.state.auth.tokenId;
    if (CoachLogin) {
        db.collection('user').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().idCoachLogin == CoachLogin.localId) {
                    store.commit('auth/SET_NOTIFICATION', true);
                }
            })
        })
    }
});

const app = createApp(App);

app.use(store)
app.use(router)
app.use(i18n)
app.use(FlagIcon)

app.component('ItemButton', ItemButton)
app.component('ItemPopUp', ItemPopUp)
app.component('ItemModal', ItemModal)
app.component('ItemLazyLoad', ItemLazyLoad)
app.component('ItemCard', ItemCard)
app.component('ItemBadge', ItemBadge)
app.component('ItemLink', ItemLink)

app.mount('#app')