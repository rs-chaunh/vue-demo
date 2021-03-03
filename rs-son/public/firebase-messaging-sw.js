importScripts("https://www.gstatic.com/firebasejs/8.2.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.8/firebase-messaging.js");
import * as firebase_API from '../src/env'

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("../firebase-messaging-sw.js")
        .then(function (registration) {
            console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function (err) {
            console.log("Service worker registration failed, error:", err);
        });
}

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


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "You have message.",
        icon: "/firebase-logo.png",
        click_action : "http://localhost:3000/"
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});