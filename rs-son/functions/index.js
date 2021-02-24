// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.firestore
  .document("message/{a}")
  .onWrite(async (event) => {
    const uid = event.after.get("userUid");
    const title = event.after.get("title");
    const content = event.after.get("content");
    let userDoc = await admin
      .firestore()
      .doc(`users/${uid}`)
      .get();
    // let fcmToken = userDoc.get("fcm");
    var message = {
      notification: {
        title: title,
        body: content,
      },
      token: "dW9xuvq2pEkrWhvFr_1bAF:APA91bGavB6iir8wnJFTow7osz6b6SXefwcEV8QnmpwpHt1IaIKOoaHdPiMg52bZvUDznPp5kt-9yyv4iOD63mIbI5II8RsMzieZ_mEyZKruAUhCZ3NbdsHgf9xvYdkO37s2LSD4ad9R",
    };

    let response = await admin.messaging().send(message);
    console.log(response);
  })