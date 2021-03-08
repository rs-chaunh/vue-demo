import {
    createApp
} from 'vue'
import FlagIcon from 'vue-flag-icon' //FIXED

import './registerServiceWorker'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './plugins/i18n'
import firebase from 'firebase'
import * as firebase_API from '../src/env'

//TODO phần config firebase nên tạo 1 file riêng, rồi import vào main cho gọn, main sau này sẽ có nhiều config hơn, khó quản lí, tương tự cho những thư viện khác
firebase.initializeApp({
  apiKey: `${firebase_API.API_KEY}`,
  authDomain: `${firebase_API.API_DOMAIN}`,
  databaseURL: `${firebase_API.API_DATA_JSON}`,
  projectId: `${firebase_API.PROJECT_ID}`,
  storageBucket: `${firebase_API.STORAGE_BUCKET}`,
  messagingSenderId: `${firebase_API.MESS_ID_SENDER}`,
  appId: `${firebase_API.API_ID}`,
  measurementId: `${firebase_API.MEAS_ID}`,
});

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

//TODO những cái import luôn để lên trên cùng
// import thư viện ... trước
// import từ file trong project ... sau

import ItemButton from "./components/Common/ItemButton";
import ItemPopUp from "./components/Common/ItemPopUp";
import ItemModal from "./components/Common/ItemModal";
import ItemLazyLoad from "./components/Common/ItemLazyLoad";
import ItemCard from "./components/Common/ItemCard";
import ItemBadge from "./components/Common/ItemBadge";
import ItemLink from "./components/Common/ItemLink";

const app = createApp(App);

app.component('ItemButton', ItemButton)
app.component('ItemPopUp', ItemPopUp)
app.component('ItemModal', ItemModal)
app.component('ItemLazyLoad', ItemLazyLoad)
app.component('ItemCard', ItemCard)
app.component('ItemBadge', ItemBadge)
app.component('ItemLink', ItemLink)

app.use(store)
app.use(router)
app.use(i18n)
app.use(FlagIcon)
app.mount('#app')