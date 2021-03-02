import {
    createApp
} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import FlagIcon from 'vue-flag-icon'
import i18n from './plugins/i18n'
import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyCe3EbXvHvc8FM4F00XoX8Fm_hOQDDctic",
    authDomain: "coaches-project-8d77f.firebaseapp.com",
    databaseURL: "https://coaches-project-8d77f-default-rtdb.firebaseio.com",
    projectId: "coaches-project-8d77f",
    storageBucket: "coaches-project-8d77f.appspot.com",
    messagingSenderId: "844022914168",
    appId: "1:844022914168:web:24930c899f52a92fdb218d",
    measurementId: "G-T6KR9FX7EY"
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
    let CoachLogin = store.getters.getTokenId;
    if (CoachLogin) {
        db.collection('user').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().idCoachLogin == CoachLogin.localId) {
                    store.commit('SET_NOTIFICATION', true);
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
app.mount('#app')