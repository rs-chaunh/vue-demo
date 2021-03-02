const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios").default;
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
      let payload = {
        notification: {
          title: title,
          body: content,
          click_action: "http://localhost:8080/coaches",
          icon:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYWXioShgsa3_D3Oxv7xIsB66yFp6a7XNLA&usqp=CAU",
        },
        to: fcmToken,
      };
      const configs = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer AAAAWn6wTGs:APA91bHfA4oWTXstS-asMhOYyrAAy11VNtMBwpKbolhcSW0raopfhcww0sfrHAbRHwHW8SSx7EpEVi6fJPSbvX_37ZdhgwbDsk6_C56XR2o49uJwoPh9jyIufC3wYd5kmIltPeDYlp4c",
        },
      };
      axios
        .post("https://fcm.googleapis.com/fcm/send", payload, configs)
        .then((res) => {
          fcmToken = "";
        })
        .catch((err) => console.log(err));
    }
  });
