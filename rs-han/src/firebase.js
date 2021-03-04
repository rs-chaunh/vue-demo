import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDivKplX5nAojJZ9kFMn9hZ0oF_Ntas1Os",
  authDomain: "my-coaches.firebaseapp.com",
  databaseURL: "https://my-coaches-default-rtdb.firebaseio.com",
  projectId: "my-coaches",
  storageBucket: "my-coaches.appspot.com",
  messagingSenderId: "388672539755",
  appId: "1:388672539755:web:4cf2c81179079df409352e",
  measurementId: "G-CVE743ESLV",
};


firebase.initializeApp(firebaseConfig);

export default firebase;
