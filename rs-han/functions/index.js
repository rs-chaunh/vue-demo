const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotificationToFCMToken = functions.firestore
  .document("messages/{a}")
  .onWrite(async (event) => {
    const uid = event.after.get("userUid");
    const title = event.after.get("title");
    const content = event.after.get("content");
    let userDoc = await admin
      .firestore()
      .doc(`users/${uid}`)
      .get();
    let fcmToken = userDoc.get("fcm");

    var message = {
      notification: {
        title: title,
        body: content,
      },
      token:
        "eKeLKBDh7ePrXIkZFJfvIS:APA91bEMDsfpxhvYx95CK1mBkkKZqBHqvSPTF4vqHuH_azKYxvAFMnt2IMhP4D5TRG_GoJahXAe6tCvgNRYQ8WC0pvQosmVIkhPWa1OqVOk71JdQPBfrGjL9Wpb9u2WHa2Y5KWIcfaJH",
    };

    let response = await admin.messaging().send(message);
    console.log(response);
  });
