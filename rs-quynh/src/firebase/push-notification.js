import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";

export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDHWnxo0i4pcV8qpmO6pEXCq6uAbPMSBok",
    authDomain: "book-coaches-by-charlotte.firebaseapp.com",
    databaseURL:
      "https://book-coaches-by-charlotte-default-rtdb.firebaseio.com",
    projectId: "book-coaches-by-charlotte",
    storageBucket: "book-coaches-by-charlotte.appspot.com",
    messagingSenderId: "924362339366",
    appId: "1:924362339366:web:9ddf428bec9e3b365ce2e7",
    measurementId: "G-BKK92N7MKJ",
  };
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("user token:", token);

    return token;
  } catch (error) {
    console.error(error);
  }
};
