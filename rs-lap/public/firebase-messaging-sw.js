importScripts('https://www.gstatic.com/firebasejs/8.2.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.8/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBviMPpTk73p83yhE6hW7swWQ7YZNOYGC8",
    authDomain: "find-your-coach-d614f.firebaseapp.com",
    databaseURL: "https://find-your-coach-d614f-default-rtdb.firebaseio.com",
    projectId: "find-your-coach-d614f",
    storageBucket: "find-your-coach-d614f.appspot.com",
    messagingSenderId: "198971150193",
    appId: "1:198971150193:web:b26280d2ea767c1065f0d0"
})

const initMessaging = firebase.messaging();