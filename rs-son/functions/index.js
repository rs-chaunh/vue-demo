// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const firebase = require('firebase')
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const {
  event
} = require('firebase-functions/lib/providers/analytics');
const {
  default: axios
} = require('axios');
admin.initializeApp();
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

exports.sendNotification = functions.firestore
  .document("message/{idMessages}")
  .onWrite(async (event) => {
    const title = event.after.get("title");
    const content = event.after.get("content");
    let token = "";
    let idCoachLogin;

    await admin.firestore().collection('user').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().token !== "") {
          token = doc.data().token;
          idCoachLogin = doc.data().idCoachLogin;
        }
      });
    });

    let API_KEY =
      "AAAAxIOvnHg:APA91bFXkdc6nmHwV10NDuY8FlwSX5oTLxWrX89zSlbtaMlhQP3tbdpFZZZKnzy2gAAsixG_2VfLlYfJeo94RSG3hKvIsI0YifFV1PiNLPwuJ9-9uW40RV65VR19kGTCVMqQ0Y09Xw_n";
    axios
      .post(
        " https://fcm.googleapis.com/fcm/send", {
          notification: {
            title: title,
            body: content.message,
            "click_action": "http://localhost:3001/",
            "icon": "/firebase-logo.png"
          },
          to: token,
        }, {
          headers: {
            authorization: `key=${API_KEY}`,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  })