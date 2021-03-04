import firebase from "./firebase-config";
import "firebase/messaging";

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
  } catch (error) {
    console.error(error);
  }
};
