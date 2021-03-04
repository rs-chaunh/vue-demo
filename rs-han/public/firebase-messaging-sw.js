importScripts("https://www.gstatic.com/firebasejs/8.2.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.8/firebase-messaging.js");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}

firebase.initializeApp({
  apiKey: "AIzaSyDivKplX5nAojJZ9kFMn9hZ0oF_Ntas1Os",
  authDomain: "my-coaches.firebaseapp.com",
  databaseURL: "https://my-coaches-default-rtdb.firebaseio.com",
  projectId: "my-coaches",
  storageBucket: "my-coaches.appspot.com",
  messagingSenderId: "388672539755",
  appId: "1:388672539755:web:4cf2c81179079df409352e",
  measurementId: "G-CVE743ESLV",
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
    body: "Background Message body.",
    icon: "/firebase-logo.png",
    click_action: "https://www.google.com.vn/",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
