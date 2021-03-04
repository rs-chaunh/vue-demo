import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDHWnxo0i4pcV8qpmO6pEXCq6uAbPMSBok",
  authDomain: "book-coaches-by-charlotte.firebaseapp.com",
  databaseURL: "https://book-coaches-by-charlotte-default-rtdb.firebaseio.com",
  projectId: "book-coaches-by-charlotte",
  storageBucket: "book-coaches-by-charlotte.appspot.com",
  messagingSenderId: "924362339366",
  appId: "1:924362339366:web:9ddf428bec9e3b365ce2e7",
  measurementId: "G-BKK92N7MKJ",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
