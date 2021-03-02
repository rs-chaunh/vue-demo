const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
let fcmToken = "";

exports.sendNotificationToFCMToken = functions.firestore
  .document("messages/{uid}")
  .onWrite(async (change, context) => {
    console.log(change.before.data());
    const uid = change.after.get("id");
    const title = change.after.get("title");
    const content = change.after.get("content");
    await admin
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().userUid === uid) {
            fcmToken = doc.data().tokens;
          }
        });
      });

    console.log("fcmToken", fcmToken);

    if (fcmToken !== "") {
      let message = {
        notification: {
          title: title,
          body: content,
        },
        token: fcmToken,
      };

      await admin
        .messaging()
        .send(message)
        .then((response) => {
          fcmToken = "";
        })
        .catch((error) => {
          console.log("error sending message", error);
        });
    }
  });
