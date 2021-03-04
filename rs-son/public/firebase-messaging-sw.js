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
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});