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
      token: "eya7X4Pq0OTwUMD3mouNHc:APA91bG4EIAtSd_8mysTtpbG4wKb1xBMaAXAg23ygDjBQepJSu0fSx_aXEgQBbOZ4Q2HTSodik5-SbJsG6MnTBooh9HYPyR-esI32xr3TD7ylsCsdk8Tid5g2gGaT4l9_fF3gOdnAWAR",
    };

    let response = await admin.messaging().send(message);
    console.log(response);
  })