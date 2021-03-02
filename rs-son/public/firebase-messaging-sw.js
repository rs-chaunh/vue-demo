importScripts("https://www.gstatic.com/firebasejs/8.2.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.8/firebase-messaging.js");


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
    apiKey: "AIzaSyCe3EbXvHvc8FM4F00XoX8Fm_hOQDDctic",
    authDomain: "coaches-project-8d77f.firebaseapp.com",
    databaseURL: "https://coaches-project-8d77f-default-rtdb.firebaseio.com",
    projectId: "coaches-project-8d77f",
    storageBucket: "coaches-project-8d77f.appspot.com",
    messagingSenderId: "844022914168",
    appId: "1:844022914168:web:24930c899f52a92fdb218d",
    measurementId: "G-T6KR9FX7EY"
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