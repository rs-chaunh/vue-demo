// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');

const {
  default: axios
} = require('axios');
admin.initializeApp();

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

    if (content.idCoach == idCoachLogin) {
      const API_KEY =
        "AAAAxIOvnHg:APA91bFXkdc6nmHwV10NDuY8FlwSX5oTLxWrX89zSlbtaMlhQP3tbdpFZZZKnzy2gAAsixG_2VfLlYfJeo94RSG3hKvIsI0YifFV1PiNLPwuJ9-9uW40RV65VR19kGTCVMqQ0Y09Xw_n";
      axios
        .post(
          " https://fcm.googleapis.com/fcm/send", {
            notification: {
              title: title,
              body: content.message,
              click_action : `http://${content.defaultURL}/`,
              icon: "/firebase-logo.png"
            },
            to: token,
          }, {
            headers: {
              authorization: `key=${API_KEY}`,
              "content-type": "application/json",
            },
          }
        )
        .then()
        .catch((err) => console.log(err));
    }
  })